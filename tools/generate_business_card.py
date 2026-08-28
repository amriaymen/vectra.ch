from __future__ import annotations

import io
import math
import struct
import zlib
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing, Rect
from reportlab.graphics.svgpath import SvgPath
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUT_PDF = OUT_DIR / "vectra-business-card-zouhair-loumini.pdf"

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
DARK_2 = HexColor("#181C21")
LIME = HexColor("#D9FF41")
WHITE = HexColor("#FFFFFF")
GRAY = HexColor("#D1D5DB")
MUTED = HexColor("#9CA3AF")

NAME = "Zouhair Loumini"
ROLE = "Directeur général"
EMAIL = "hello@vectrastudio.ch"
PHONE = "+41 76 456 81 17"
ADDRESS_1 = "Chemin de la Colline 19"
ADDRESS_2 = "1635 La Tour-de-Trême (Fribourg), Suisse"
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


LOGO_PATH = (
    "M946.49 726.21 v411.48 a48.36 48.36 0 0 1 -48.36 48.36 H498 "
    "a48.35 48.35 0 0 1 -40.3 -21.63 L8.06 486.57 A48.31 48.31 0 0 1 0 459.84 "
    "V48.36 A48.36 48.36 0 0 1 48.36 0 H448.47 a48.35 48.35 0 0 1 40.3 21.63 "
    "L938.43 699.48 A48.31 48.31 0 0 1 946.49 726.21 Z"
)


def draw_mark(c: canvas.Canvas, x: float, y: float, width: float, color: Color) -> None:
    source_w, source_h = 1423.26, 1186.05
    scale = width / source_w
    height = source_h * scale
    drawing = Drawing(source_w, source_h)
    drawing.add(Rect(948.84, 711.63, 474.42, 474.42, rx=48.36, ry=48.36, fillColor=color, strokeColor=None))
    drawing.add(SvgPath(LOGO_PATH, fillColor=color, strokeColor=None))
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
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


def draw_front(c: canvas.Canvas) -> None:
    c.setFillColor(LIME)
    c.rect(BLEED_X, BLEED_Y, TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED, fill=1, stroke=0)

    # A single centered lockup makes the card instantly recognizable at a glance.
    mark_w = mm(17.5)
    mark_h = mark_w * 1186.05 / 1423.26
    word = "Vectra"
    word_size = 24
    word_w = pdfmetrics.stringWidth(word, "TTFirs-Medium", word_size)
    gap = mm(4)
    lockup_w = mark_w + gap + word_w
    start_x = TRIM_X + (TRIM_W - lockup_w) / 2
    center_y = TRIM_Y + TRIM_H / 2

    draw_mark(c, start_x, center_y - mark_h / 2, mark_w, DARK)
    c.setFillColor(DARK)
    c.setFont("TTFirs-Medium", word_size)
    c.drawString(start_x + mark_w + gap, center_y - word_size * 0.34, word)

    draw_spaced_text(
        c,
        TRIM_X + mm(7),
        TRIM_Y + mm(6.2),
        "SYSTÈMES OPÉRATIONNELS · SUISSE",
        "TTFirs-Medium",
        6.6,
        0.7,
    )

    # Tiny registration-style detail, borrowed from the website's technical tone.
    x2 = TRIM_X + TRIM_W - mm(7)
    y2 = TRIM_Y + mm(6.2)
    c.setLineWidth(0.7)
    c.line(x2 - mm(7), y2 + mm(0.8), x2, y2 + mm(0.8))
    c.circle(x2, y2 + mm(0.8), mm(0.7), fill=1, stroke=0)
    draw_crop_marks(c)


def draw_qr(c: canvas.Canvas, x: float, y: float, size: float) -> None:
    c.setFillColor(LIME)
    c.roundRect(x, y, size, size, mm(1.6), fill=1, stroke=0)

    qr = QrCodeWidget(QR_URL)
    qr.barFillColor = DARK
    qr.barStrokeColor = DARK
    bounds = qr.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    inner = size - mm(3.2)
    drawing = Drawing(inner, inner, transform=[inner / qr_w, 0, 0, inner / qr_h, 0, 0])
    drawing.add(qr)
    renderPDF.draw(drawing, c, x + mm(1.6), y + mm(1.6))


def draw_back(c: canvas.Canvas) -> None:
    c.setFillColor(DARK)
    c.rect(BLEED_X, BLEED_Y, TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED, fill=1, stroke=0)

    left = TRIM_X + mm(7)
    right = TRIM_X + TRIM_W - mm(7)
    top = TRIM_Y + TRIM_H - mm(6.5)

    # Compact brand signature.
    mark_w = mm(5.2)
    mark_h = mark_w * 1186.05 / 1423.26
    draw_mark(c, left, top - mark_h, mark_w, LIME)
    c.setFillColor(WHITE)
    c.setFont("TTFirs-Medium", 12.8)
    c.drawString(left + mark_w + mm(2.2), top - mark_h * 0.62, "Vectra")

    # Name and role form the primary typographic anchor.
    name_y = TRIM_Y + mm(32.5)
    c.setFont("TTFirs", 18)
    c.setFillColor(WHITE)
    c.drawString(left, name_y, NAME)
    c.setFont("TTFirs-Medium", 8.4)
    c.setFillColor(LIME)
    c.drawString(left, TRIM_Y + mm(26.5), ROLE)

    # Contact details.
    c.setFillColor(WHITE)
    c.setFont("TTFirs", 8.1)
    c.drawString(left, TRIM_Y + mm(18), EMAIL)
    c.drawString(left, TRIM_Y + mm(13.6), PHONE)
    c.setFillColor(GRAY)
    c.setFont("TTFirs", 6.4)
    c.drawString(left, TRIM_Y + mm(9), ADDRESS_1)
    c.drawString(left, TRIM_Y + mm(5.8), ADDRESS_2)

    # QR code and web address.
    qr_size = mm(20)
    qr_x = right - qr_size
    qr_y = TRIM_Y + mm(10.5)
    draw_qr(c, qr_x, qr_y, qr_size)
    c.setFillColor(MUTED)
    draw_spaced_text(
        c,
        qr_x + qr_size / 2,
        TRIM_Y + mm(6.5),
        "VECTRASTUDIO.CH",
        "TTFirs-Medium",
        5.8,
        0.25,
        centered=True,
    )

    # Fine rules echo the website's dark grid without adding visual noise.
    c.setStrokeColor(HexColor("#282E36"))
    c.setLineWidth(0.45)
    c.line(left, TRIM_Y + mm(3), right, TRIM_Y + mm(3))
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
            "/Title": "Carte de visite Vectra - Zouhair Loumini",
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
    c.setTitle("Carte de visite Vectra - Zouhair Loumini")
    draw_front(c)
    c.showPage()
    draw_back(c)
    c.showPage()
    c.save()
    apply_print_boxes(OUT_PDF)
    print(OUT_PDF)


if __name__ == "__main__":
    main()
