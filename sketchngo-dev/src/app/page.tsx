"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCaseStudies } from "@/lib/mock-data";

const HEADLINE_WORDS = ["We Build", "Software", "That Grows", "Your Business."];

const SERVICES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Web Applications",
    description: "Full-stack apps with Next.js, React, and modern backends. Fast, scalable, production-ready.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "SaaS Products",
    description: "End-to-end SaaS development — auth, billing, dashboards, onboarding.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Fast Delivery",
    description: "No bloated agencies. Direct communication, tight deadlines, real results.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Quality Code",
    description: "Clean, documented, maintainable code. Built to scale with your business.",
  },
];

const STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Node.js", "Supabase", "PostgreSQL", "Stripe",
  "Vercel", "Prisma", "Framer Motion", "Figma",
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Nav ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 border-b border-border/40 bg-background/70 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 14L14 2M2 2h12v12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-foreground text-sm font-medium">SketchnGo</span>
            <span className="text-accent text-xs font-medium tracking-wide">DEV</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/#services" className="hover:text-foreground transition-colors">Services</Link>
          <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
          <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <a href="https://calendly.com/sketchngo/30min" target="_blank" rel="noopener noreferrer">
            <Button variant="accent" size="sm" className="gap-1.5">
              Book a call <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16 px-6">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Lime glow blob */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "oklch(0.91 0.22 120)" }}
        />

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Pre-headline badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="active" dot className="text-sm px-4 py-1.5">
              Available for new projects · 2026
            </Badge>
          </div>

          {/* Word-by-word animated headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.05] mb-8">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.3em] animate-slide-up"
                style={{ animationDelay: `${i * 0.12}s`, animationFillMode: "both" }}
              >
                {i === 0 ? (
                  <span className="lime-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            Custom web apps, SaaS platforms, and digital products — built fast, built right. No agency bloat. Just results.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.65s", animationFillMode: "both" }}
          >
            <Link href="/work">
              <Button variant="accent" size="lg" className="gap-2 glow-lime-sm">
                View our work
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="https://calendly.com/sketchngo/30min" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Book a free call
              </Button>
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="mt-12 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.85s" }}
          >
            {["Project-based pricing", "5-day delivery on small projects", "Money-back guarantee"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-border" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">What we do</p>
            <h2 className="text-4xl font-light tracking-tight">
              Full-stack development,<br />end to end
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className="p-5 rounded-xl border border-border bg-card hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-medium mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tech stack marquee ───────────────────────────────────── */}
      <div className="py-8 border-y border-border overflow-hidden bg-background">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite]" style={{ width: "max-content" }}>
          {[...STACK, ...STACK].map((tech, i) => (
            <span key={i} className="text-muted-foreground text-sm font-medium whitespace-nowrap">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Featured work ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">Case studies</p>
              <h2 className="text-4xl font-light tracking-tight">Recent work</h2>
            </div>
            <Link href="/work">
              <Button variant="outline" size="sm" className="gap-1.5">
                All work <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockCaseStudies.filter((cs) => cs.featured).map((cs, i) => (
              <Link
                key={cs.id}
                href={`/work/${cs.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Cover placeholder */}
                <div className="h-48 bg-secondary flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, oklch(0.91 0.22 120) 0%, transparent 60%)`,
                    }}
                  />
                  <span className="text-5xl font-light text-muted-foreground/30 select-none">
                    {cs.client.charAt(0)}
                  </span>
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {cs.stack.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] bg-card/80 backdrop-blur-sm border border-border px-2 py-0.5 rounded text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="muted" className="mb-3">{cs.category.replace("-", " ")}</Badge>
                  <h3 className="font-medium text-base mb-2 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{cs.subtitle}</p>
                  {/* Key metric */}
                  {cs.metrics[0] && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-accent">{cs.metrics[0].value}</span>
                      <span className="text-xs text-muted-foreground">{cs.metrics[0].label}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-primary-foreground mb-6 tracking-tight">
            Ready to build something?
          </h2>
          <p className="text-primary-foreground/60 mb-8 text-lg">
            Book a 30-minute call. We'll scope your project and give you a quote — no commitment.
          </p>
          <a href="https://calendly.com/sketchngo/30min" target="_blank" rel="noopener noreferrer">
            <Button
              className="bg-accent text-accent-foreground hover:opacity-90 h-12 px-8 text-base gap-2"
            >
              Book a free call
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-6 bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M2 2h12v12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>SketchnGo Dev</span>
            <span className="text-border">·</span>
            <span>Made in Djerba 🇹🇳</span>
          </div>
          <div className="flex gap-4">
            <a href="mailto:hello@sketchngo.dev" className="hover:text-foreground transition-colors">hello@sketchngo.dev</a>
            <a href="https://linkedin.com/company/sketchngo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
