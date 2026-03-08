"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    DollarSign,
    TrendingUp,
    Briefcase,
    Sun,
    Moon,
    LogOut,
    ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
    },
    {
        label: "Pipeline",
        href: "/dashboard/pipeline",
        icon: TrendingUp,
    },
    {
        label: "Clients",
        href: "/dashboard/clients",
        icon: Users,
    },
    {
        label: "Finances",
        href: "/dashboard/finances",
        icon: DollarSign,
    },
];

const publicItems = [
    {
        label: "Work",
        href: "/work",
        icon: Briefcase,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-sidebar border-r border-sidebar-border z-40">
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-sidebar-border shrink-0">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 14L14 2M2 2h12v12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-sidebar-foreground text-sm font-medium tracking-tight">SketchnGo</span>
                        <span className="text-accent text-xs font-medium tracking-wide">DEV</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-0.5">
                {/* Dashboard section */}
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                    Command Center
                </p>
                {navItems.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} />
                ))}

                <div className="my-3 border-t border-sidebar-border" />

                {/* Public site section */}
                <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                    Public Site
                </p>
                {publicItems.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} />
                ))}
            </nav>

            {/* Footer */}
            <div className="shrink-0 border-t border-sidebar-border p-3 flex flex-col gap-1">
                {/* Theme toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-white/5 transition-colors text-sm w-full"
                >
                    {theme === "dark" ? (
                        <Sun className="w-4 h-4 shrink-0" />
                    ) : (
                        <Moon className="w-4 h-4 shrink-0" />
                    )}
                    <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                </button>

                {/* User profile */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                    <Avatar name="SketchnGo Dev" size="sm" accentColor />
                    <div className="flex-1 min-w-0">
                        <p className="text-sidebar-foreground text-xs font-medium truncate">SketchnGo Dev</p>
                        <p className="text-sidebar-muted text-[10px] truncate">hello@sketchngo.dev</p>
                    </div>
                    <LogOut className="w-3.5 h-3.5 text-sidebar-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
            </div>
        </aside>
    );
}

function NavLink({
    item,
    pathname,
}: {
    item: { label: string; href: string; icon: React.ComponentType<{ className?: string }> };
    pathname: string;
}) {
    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group",
                isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-white/5"
            )}
        >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {isActive && (
                <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            )}
        </Link>
    );
}
