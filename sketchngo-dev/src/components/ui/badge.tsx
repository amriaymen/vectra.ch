import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-primary/10 text-primary border border-primary/20",
                accent: "bg-accent text-accent-foreground",
                success: "bg-success/10 text-success border border-success/20",
                warning: "bg-warning/10 text-warning-foreground border border-warning/20",
                destructive: "bg-destructive/10 text-destructive border border-destructive/20",
                muted: "bg-muted text-muted-foreground",
                outline: "border border-border text-foreground bg-transparent",
                active: "bg-accent/15 text-accent-foreground border border-accent/30",
                // Project status badges
                "status-active": "bg-success/10 text-success border border-success/25",
                "status-review": "bg-warning/10 text-warning-foreground border border-warning/25",
                "status-delivered": "bg-chart-2/15 text-chart-2 border border-chart-2/25",
                "status-archived": "bg-muted text-muted-foreground",
                // Pipeline stage badges
                "stage-discovery": "bg-chart-3/15 text-chart-3 border border-chart-3/25",
                "stage-proposal": "bg-warning/10 text-warning-foreground border border-warning/25",
                "stage-negotiation": "bg-accent/15 text-accent-foreground border border-accent/30",
                "stage-won": "bg-success/10 text-success border border-success/25",
                "stage-lost": "bg-destructive/10 text-destructive border border-destructive/20",
                // Finance badges
                "paid": "bg-success/10 text-success border border-success/25",
                "pending": "bg-warning/10 text-warning-foreground border border-warning/25",
                "overdue": "bg-destructive/10 text-destructive border border-destructive/20",
                "partial": "bg-chart-3/15 text-chart-3 border border-chart-3/25",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props}>
            {dot && (
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
            )}
            {children}
        </span>
    );
}

export { Badge, badgeVariants };
