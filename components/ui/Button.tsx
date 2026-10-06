import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05070C]";

    const variants = {
      primary: "bg-[#38BDF8] hover:bg-[#0EA5E9] text-white shadow-lg shadow-[#38BDF8]/20 hover:shadow-xl hover:shadow-[#38BDF8]/30 focus:ring-[#38BDF8]/50 hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-[#0F131C] border border-gray-800 hover:border-[#38BDF8] text-white hover:bg-[#161D2B] focus:ring-[#38BDF8]/30",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5 focus:ring-white/20",
      danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/30 focus:ring-red-500/30",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm gap-1.5",
      md: "h-11 px-5 text-base gap-2",
      lg: "h-12 px-6 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
