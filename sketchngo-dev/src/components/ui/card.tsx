import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }
>(({ className, hover, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
            hover && "transition-all duration-200 hover:shadow-md hover:border-border/80 cursor-pointer",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 p-5 pb-0", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-base font-medium leading-snug tracking-tight", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center gap-3 p-5 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

// Stat card variant for KPI metrics
const StatCard = ({
    label,
    value,
    delta,
    deltaLabel,
    icon,
    accent,
    className,
}: {
    label: string;
    value: string | number;
    delta?: number;
    deltaLabel?: string;
    icon?: React.ReactNode;
    accent?: boolean;
    className?: string;
}) => {
    const isPositive = delta !== undefined && delta >= 0;
    return (
        <Card
            className={cn(
                "p-5 flex flex-col gap-3",
                accent && "border-accent/30 bg-accent/5",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
                {icon && (
                    <span className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                        {icon}
                    </span>
                )}
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold tracking-tight">{value}</span>
                {delta !== undefined && (
                    <span
                        className={cn(
                            "text-xs font-medium mb-0.5",
                            isPositive ? "text-success" : "text-destructive"
                        )}
                    >
                        {isPositive ? "+" : ""}{delta}% {deltaLabel}
                    </span>
                )}
            </div>
        </Card>
    );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, StatCard };
