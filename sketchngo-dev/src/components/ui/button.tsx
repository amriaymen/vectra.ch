import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] select-none",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
                accent:
                    "bg-accent text-accent-foreground hover:opacity-90 shadow-sm glow-lime-sm",
                outline:
                    "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
                ghost:
                    "bg-transparent hover:bg-secondary hover:text-secondary-foreground",
                destructive:
                    "bg-destructive text-destructive-foreground hover:opacity-90",
                link:
                    "text-primary underline-offset-4 hover:underline bg-transparent",
                secondary:
                    "bg-secondary text-secondary-foreground hover:opacity-80",
                muted:
                    "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            },
            size: {
                sm: "h-8 px-3 text-xs gap-1.5",
                default: "h-10 px-4",
                lg: "h-11 px-6 text-base",
                xl: "h-13 px-8 text-base",
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
