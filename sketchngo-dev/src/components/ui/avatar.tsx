import * as React from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
    name?: string;
    src?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    accentColor?: boolean;
}

const sizeMap = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
};

export function Avatar({ name, src, size = "md", className, accentColor }: AvatarProps) {
    if (src) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={name ?? "Avatar"}
                className={cn("rounded-full object-cover shrink-0", sizeMap[size], className)}
            />
        );
    }

    return (
        <span
            className={cn(
                "rounded-full flex items-center justify-center font-medium shrink-0",
                accentColor
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground",
                sizeMap[size],
                className
            )}
        >
            {name ? getInitials(name) : "?"}
        </span>
    );
}
