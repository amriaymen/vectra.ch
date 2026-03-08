import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCaseStudies } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = mockCaseStudies.find((cs) => cs.slug === slug);
    if (!study) return { title: "Not Found" };
    return { title: study.title, description: study.subtitle };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = mockCaseStudies.find((cs) => cs.slug === slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* ─── Nav ─────────────────────────────────────────────────── */}
            <nav className="h-16 flex items-center px-6 md:px-10 border-b border-border/40 bg-background/70 backdrop-blur-md sticky top-0 z-50">
                <Link href="/work" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors mr-auto text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    All Work
                </Link>
                <a href="https://calendly.com/sketchngo/30min" target="_blank" rel="noopener noreferrer">
                    <Button variant="accent" size="sm" className="gap-1.5 hidden sm:flex">
                        Book a call <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </a>
            </nav>

            {/* ─── Hero ────────────────────────────────────────────────── */}
            <section className="pt-20 pb-12 px-6 max-w-3xl mx-auto text-center">
                <Badge variant="muted" className="mb-6">{study.category.replace("-", " ")}</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 animate-slide-up">
                    {study.title}
                </h1>
                <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                    {study.subtitle}
                </p>

                <div className="mt-10 flex flex-wrap gap-2 justify-center animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                    {study.stack.map((s) => (
                        <span key={s} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                            {s}
                        </span>
                    ))}
                </div>
            </section>

            {/* ─── Metrics Bar ─────────────────────────────────────────── */}
            <section className="px-6 max-w-5xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden p-px">
                    {study.metrics.map((metric, i) => (
                        <div key={i} className="bg-card p-6 flex flex-col justify-center text-center">
                            <span className="text-3xl font-light text-accent mb-1">{metric.value}</span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Content ─────────────────────────────────────────────── */}
            <section className="px-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>

                {/* Cover Placeholder */}
                <div className="w-full aspect-video rounded-2xl bg-secondary mb-16 overflow-hidden relative mr-auto ml-auto isolate border border-border/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent mix-blend-overlay" />
                    <div className="w-full h-full flex flex-col items-center justify-center border-4 border-background rounded-2xl bg-card/50 backdrop-blur m-4">
                        <span className="text-4xl">💻</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-light prose-headings:tracking-tight">
                    <h2>The Problem</h2>
                    <p>{study.problem}</p>

                    <h2 className="mt-12">The Solution</h2>
                    <p>{study.solution}</p>

                    <h2 className="mt-12">The Outcome</h2>
                    <div className="p-6 rounded-xl bg-accent/5 border border-accent/20 my-6">
                        <div className="flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                            <p className="m-0 text-foreground font-medium">{study.outcome}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Bottom CTA ──────────────────────────────────────────── */}
            <section className="px-6 max-w-3xl mx-auto mt-24 pt-12 border-t border-border text-center">
                <h2 className="text-3xl font-light mb-4">Start a similar project</h2>
                <p className="text-muted-foreground mb-8">
                    Let's talk about your business goals and how we can help you get there.
                </p>
                <a href="https://calendly.com/sketchngo/30min" target="_blank" rel="noopener noreferrer">
                    <Button variant="accent" size="lg" className="gap-2 glow-lime-sm">
                        Book a free call <ArrowRight className="w-4 h-4" />
                    </Button>
                </a>
            </section>
        </div>
    );
}
