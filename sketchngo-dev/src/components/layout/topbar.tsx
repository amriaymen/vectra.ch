"use client";

import { Bell, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TopbarProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export function Topbar({ title, description, actions }: TopbarProps) {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
            <div>
                <h1 className="text-base font-medium text-foreground tracking-tight">{title}</h1>
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-2">
                {actions}

                {/* Quick search */}
                <button className="h-9 px-3 rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors text-sm flex items-center gap-2">
                    <Search className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-xs">Search…</span>
                    <kbd className="hidden sm:inline text-[10px] bg-muted rounded px-1 py-0.5">⌘K</kbd>
                </button>

                {/* Notifications placeholder */}
                <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
                </button>

                {/* Quick add */}
                <Link href="/dashboard/projects/new">
                    <Button variant="accent" size="sm" className="gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        New Project
                    </Button>
                </Link>
            </div>
        </header>
    );
}
