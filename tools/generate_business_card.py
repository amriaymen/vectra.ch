from __future__ import annotations

import io
import math
import struct
import zlib
from pathlib import Path
from xml.etree import ElementTree

from pypdf import PdfReader, PdfWriter
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing, Rect
from reportlab.graphics.svgpath import SvgPath
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUT_PDF = OUT_DIR / "vectra-business-card-zouheir-lommini.pdf"

MM = 72 / 25.4
TRIM_W = 85 * MM
TRIM_H = 55 * MM
BLEED = 3 * MM
SLUG = 3 * MM
PAGE_W = TRIM_W + 2 * (BLEED + SLUG)
PAGE_H = TRIM_H + 2 * (BLEED + SLUG)
TRIM_X = BLEED + SLUG
TRIM_Y = BLEED + SLUG
BLEED_X = SLUG
BLEED_Y = SLUG

DARK = HexColor("#121519")
LIME = HexColor("#D9FF41")
WHITE = HexColor("#FFFFFF")
GRAY = HexColor("#D1D5DB")

NAME = "Zouheir Lommini"
ROLE = "Directeur général"
EMAIL = "hello@vectrastudio.ch"
PHONE = "+41 76 456 81 17"
ADDRESS_1 = "Chemin des Ebastements 29"
ADDRESS_2 = "1618 Châtel-Saint-Denis"
ADDRESS_3 = "(Fribourg), Suisse"
QR_URL = "https://vectrastudio.ch"


def mm(value: float) -> float:
    return value * MM


def woff_to_ttf(source: Path, target: Path) -> None:
    """Convert a WOFF1 wrapper back to its sfnt/TTF payload."""
    raw = source.read_bytes()
    if raw[:4] != b"wOFF":
        raise ValueError(f"Expected WOFF1 font: {source}")

    flavor, _, num_tables = struct.unpack(">IIH", raw[4:14])
    directory_offset = 44
    tables: list[tuple[bytes, int, int, bytes]] = []
    for index in range(num_tables):
        entry = directory_offset + index * 20
        tag, offset, comp_len, orig_len, checksum = struct.unpack(
            ">4sIIII", raw[entry : entry + 20]
        )
        data = raw[offset : offset + comp_len]
        if comp_len < orig_len:
            data = zlib.decompress(data)
        if len(data) != orig_len:
            raise ValueError(f"Invalid WOFF table {tag!r}")
        tables.append((tag, checksum, orig_len, data))

    entry_selector = int(math.log2(num_tables)) if num_tables else 0
    search_range = (2**entry_selector) * 16
    range_shift = num_tables * 16 - search_range
    table_offset = 12 + 16 * num_tables
    records = []
    payload = bytearray()

    for tag, checksum, orig_len, data in sorted(tables, key=lambda item: item[0]):
        padded_offset = table_offset + len(payload)
        records.append(struct.pack(">4sIII", tag, checksum, padded_offset, orig_len))
        payload.extend(data)
        payload.extend(b"\0" * ((4 - len(data) % 4) % 4))

    sfnt = io.BytesIO()
    sfnt.write(struct.pack(">IHHHH", flavor, num_tables, search_range, entry_selector, range_shift))
    for record in records:
        sfnt.write(record)
    sfnt.write(payload)
    target.write_bytes(sfnt.getvalue())


def register_fonts() -> None:
    regular_ttf = TMP_DIR / "TT-Firs-Neue-Regular.ttf"
    medium_ttf = TMP_DIR / "TT-Firs-Neue-Medium.ttf"
    woff_to_ttf(ROOT / "fonts" / "TT Firs Neue Trial Regular.woff", regular_ttf)
    woff_to_ttf(ROOT / "fonts" / "TT Firs Neue Trial Medium.woff", medium_ttf)
    pdfmetrics.registerFont(TTFont("TTFirs", str(regular_ttf)))
    pdfmetrics.registerFont(TTFont("TTFirs-Medium", str(medium_ttf)))


def load_logo_drawing() -> tuple[Drawing, float, float]:
    """Load the supplied SVG's geometry directly, without recreating the mark."""
    svg_path = ROOT / "public" / "assets" / "logo.svg"
    root = ElementTree.parse(svg_path).getroot()
    _, _, source_w, source_h = [float(value) for value in root.attrib["viewBox"].split()]
    drawing = Drawing(source_w, source_h)

    for element in root.iter():
        tag = element.tag.rsplit("}", 1)[-1]
        if tag == "rect":
            drawing.add(
                Rect(
                    float(element.attrib.get("x", 0)),
                    float(element.attrib.get("y", 0)),
                    float(element.attrib["width"]),
                    float(element.attrib["height"]),
                    rx=float(element.attrib.get("rx", 0)),
                    ry=float(element.attrib.get("ry", element.attrib.get("rx", 0))),
                    fillColor=LIME,
                    strokeColor=None,
                )
            )
        elif tag == "path":
            drawing.add(SvgPath(element.attrib["d"], fillColor=LIME, strokeColor=None))
    return drawing, source_w, source_h


def draw_mark(c: canvas.Canvas, x: float, y: float, width: float) -> None:
    drawing, source_w, source_h = load_logo_drawing()
    scale = width / source_w
    height = source_h * scale
    c.saveState()
    # SVG uses a top-left origin. This transform preserves the asset's native orientation.
    c.translate(x, y + height)
    c.scale(scale, -scale)
    renderPDF.draw(drawing, c, 0, 0)
    c.restoreState()
    return height


def draw_crop_marks(c: canvas.Canvas) -> None:
    c.saveState()
    c.setStrokeColor(HexColor("#111111"))
    c.setLineWidth(0.25)
    left = TRIM_X
    right = TRIM_X + TRIM_W
    bottom = TRIM_Y
    top = TRIM_Y + TRIM_H
    gap = mm(1)

    for y in (bottom, top):
        c.line(0, y, left - gap, y)
        c.line(right + gap, y, PAGE_W, y)
    for x in (left, right):
        c.line(x, 0, x, bottom - gap)
        c.line(x, top + gap, x, PAGE_H)
    c.restoreState()


def draw_spaced_text(
    c: canvas.Canvas,
    x: float,
    y: float,
    text: str,
    font_name: str,
    font_size: float,
    char_space: float,
    centered: bool = False,
) -> None:
    width = pdfmetrics.stringWidth(text, font_name, font_size) + char_space * max(0, len(text) - 1)
    text_object = c.beginText()
    text_object.setTextOrigin(x - width / 2 if centered else x, y)
    text_object.setFont(font_name, font_size)
    text_object.setCharSpace(char_space)
    text_object.textOut(text)
    c.drawText(text_object)


def draw_brand_lockup(c: canvas.Canvas, x: float, y: float, total_width: float) -> tuple[float, float]:
    """Draw the complete website lockup: symbol, VECTRASTUDIO, BY TIMGROUP."""
    mark_w = total_width * 0.16
    mark_h = mark_w * 1186.05 / 1423.26
    gap = total_width * 0.055
    text_x = x + mark_w + gap
    text_w = total_width - mark_w - gap

    draw_mark(c, x, y, mark_w)

    main = "VECTRASTUDIO"
    main_char_space = total_width / mm(72) * 0.35
    main_unit_width = pdfmetrics.stringWidth(main, "TTFirs", 1)
    main_size = (text_w - main_char_space * (len(main) - 1)) / main_unit_width
    c.setFillColor(WHITE)
    draw_spaced_text(
        c,
        text_x,
        y + mark_h * 0.53,
        main,
        "TTFirs",
        main_size,
        main_char_space,
    )

    sub = "BY TIMGROUP"
    sub_size = main_size * 0.47
    sub_char_space = sub_size * 0.15
    c.setFillColor(HexColor("#7F8797"))
    draw_spaced_text(
        c,
        text_x,
        y - mark_h * 0.02,
        sub,
        "TTFirs",
        sub_size,
        sub_char_space,
    )
    return total_width, mark_h


def draw_front(c: canvas.Canvas) -> None:
    c.setFillColor(DARK)
    c.rect(BLEED_X, BLEED_Y, TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED, fill=1, stroke=0)

    # The front reproduces the supplied website logo lockup without extra elements.
    lockup_w = mm(72)
    mark_h = lockup_w * 0.16 * 1186.05 / 1423.26
    lockup_x = TRIM_X + (TRIM_W - lockup_w) / 2
    lockup_y = TRIM_Y + (TRIM_H - mark_h) / 2
    draw_brand_lockup(c, lockup_x, lockup_y, lockup_w)
    draw_crop_marks(c)


def draw_qr(c: canvas.Canvas, x: float, y: float, size: float) -> None:
    c.setFillColor(LIME)
    c.roundRect(x, y, size, size, mm(0.8), fill=1, stroke=0)

    qr = QrCodeWidget(QR_URL)
    qr.barFillColor = DARK
    qr.barStrokeColor = DARK
    bounds = qr.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    quiet = mm(1.4)
    inner = size - 2 * quiet
    drawing = Drawing(inner, inner, transform=[inner / qr_w, 0, 0, inner / qr_h, 0, 0])
    drawing.add(qr)
    renderPDF.draw(drawing, c, x + quiet, y + quiet)


def draw_back(c: canvas.Canvas) -> None:
    c.setFillColor(DARK)
    c.rect(BLEED_X, BLEED_Y, TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED, fill=1, stroke=0)

    left = TRIM_X + mm(7)
    right = TRIM_X + TRIM_W - mm(7)
    top = TRIM_Y + TRIM_H - mm(6.5)

    # Compact version of the same complete website lockup.
    header_w = mm(35)
    header_mark_h = header_w * 0.16 * 1186.05 / 1423.26
    draw_brand_lockup(c, left, top - header_mark_h, header_w)

    # Name and role form the primary typographic anchor.
    name_y = TRIM_Y + mm(32.5)
    c.setFont("TTFirs", 18)
    c.setFillColor(WHITE)
    c.drawString(left, name_y, NAME)
    c.setFont("TTFirs-Medium", 8.4)
    c.setFillColor(LIME)
    c.drawString(left, TRIM_Y + mm(26.5), ROLE)

    # Keep every textual element on the same left edge as the identity block.
    text_x = left
    c.setFillColor(WHITE)
    c.setFont("TTFirs", 7.4)
    c.drawString(text_x, TRIM_Y + mm(19.8), EMAIL)
    c.drawString(text_x, TRIM_Y + mm(15.6), PHONE)
    c.setFillColor(GRAY)
    c.setFont("TTFirs", 5.6)
    c.drawString(text_x, TRIM_Y + mm(10.6), ADDRESS_1)
    c.drawString(text_x, TRIM_Y + mm(7.5), ADDRESS_2)
    c.drawString(text_x, TRIM_Y + mm(4.4), ADDRESS_3)

    qr_size = mm(17)
    qr_x = right - qr_size
    qr_y = TRIM_Y + mm(5.2)
    draw_qr(c, qr_x, qr_y, qr_size)

    # The lime spine ties the brand mark, identity block, and contact details together.
    c.setStrokeColor(LIME)
    c.setLineWidth(mm(0.75))
    c.line(TRIM_X, TRIM_Y + mm(5), TRIM_X, TRIM_Y + TRIM_H - mm(5))
    draw_crop_marks(c)


def apply_print_boxes(pdf_path: Path) -> None:
    reader = PdfReader(str(pdf_path))
    writer = PdfWriter()
    for page in reader.pages:
        page.trimbox.lower_left = (TRIM_X, TRIM_Y)
        page.trimbox.upper_right = (TRIM_X + TRIM_W, TRIM_Y + TRIM_H)
        page.bleedbox.lower_left = (BLEED_X, BLEED_Y)
        page.bleedbox.upper_right = (BLEED_X + TRIM_W + 2 * BLEED, BLEED_Y + TRIM_H + 2 * BLEED)
        page.cropbox.lower_left = (0, 0)
        page.cropbox.upper_right = (PAGE_W, PAGE_H)
        writer.add_page(page)
    writer.add_metadata(
        {
            "/Title": "Carte de visite Vectra - Zouheir Lommini",
            "/Author": "Vectra",
            "/Subject": "Carte de visite recto-verso, format suisse 85 x 55 mm",
        }
    )
    with pdf_path.open("wb") as handle:
        writer.write(handle)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()

    c = canvas.Canvas(str(OUT_PDF), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("Carte de visite Vectra - Zouheir Lommini")
    draw_front(c)
    c.showPage()
    draw_back(c)
    c.showPage()
    c.save()
    apply_print_boxes(OUT_PDF)
    print(OUT_PDF)


if __name__ == "__main__":
    main()
