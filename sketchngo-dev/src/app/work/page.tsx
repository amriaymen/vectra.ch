import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCaseStudies } from "@/lib/mock-data";

export const metadata = { title: "Work" };

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* ─── Nav ─────────────────────────────────────────────────── */}
            <nav className="h-16 flex items-center px-6 md:px-10 border-b border-border/40 bg-background/70 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors mr-auto text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
            </nav>

            {/* ─── Header ──────────────────────────────────────────────── */}
            <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4 animate-slide-up">
                    Our Work
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                    A selection of recent projects, from full SaaS builds to marketing sites that convert.
                </p>
            </section>

            {/* ─── Grid ────────────────────────────────────────────────── */}
            <section className="pb-24 px-6 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                    {mockCaseStudies.map((cs, i) => (
                        <Link
                            key={cs.id}
                            href={`/work/${cs.slug}`}
                            className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${i * 0.1 + 0.2}s`, animationFillMode: "both" }}
                        >
                            <div className="h-56 bg-secondary flex items-center justify-center relative overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{ background: `linear-gradient(135deg, oklch(0.91 0.22 120) 0%, transparent 60%)` }}
                                />
                                <span className="text-6xl font-light text-muted-foreground/30 select-none">
                                    {cs.client.charAt(0)}
                                </span>
                                <div className="absolute top-4 right-4">
                                    <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="muted">{cs.category.replace("-", " ")}</Badge>
                                    {cs.featured && <Badge variant="active" dot>Featured</Badge>}
                                </div>
                                <h3 className="font-medium text-lg mb-2 group-hover:text-accent transition-colors">
                                    {cs.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {cs.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                                    {cs.stack.slice(0, 4).map((s) => (
                                        <span key={s} className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                                            {s}
                                        </span>
                                    ))}
                                    {cs.stack.length > 4 && (
                                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5">
                                            +{cs.stack.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
