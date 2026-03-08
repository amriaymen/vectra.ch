import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, iconRight, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 flex items-center">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground",
                        "placeholder:text-muted-foreground",
                        "transition-colors duration-150",
                        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        icon && "pl-9",
                        iconRight && "pr-9",
                        error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {iconRight && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 flex items-center">
                        {iconRight}
                    </span>
                )}
                {error && (
                    <p className="mt-1 text-xs text-destructive">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground",
                        "placeholder:text-muted-foreground",
                        "transition-colors duration-150 resize-none",
                        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-destructive">{error}</p>
                )}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, children, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <select
                    className={cn(
                        "flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground",
                        "transition-colors duration-150 cursor-pointer appearance-none",
                        "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 8L1 3h10L6 8z" />
                    </svg>
                </span>
                {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            </div>
        );
    }
);
Select.displayName = "Select";

const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
    <label
        ref={ref}
        className={cn("text-sm font-medium text-foreground leading-none", className)}
        {...props}
    >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
    </label>
));
Label.displayName = "Label";

export { Input, Textarea, Select, Label };
