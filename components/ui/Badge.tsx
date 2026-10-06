import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-gray-500/10 text-gray-300 border-gray-500/20",
      success: "bg-green-500/10 text-green-400 border-green-500/20",
      warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      danger: "bg-red-500/10 text-red-400 border-red-500/20",
      info: "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20",
    };

    const sizes = {
      sm: "h-5 px-2 text-xs",
      md: "h-6 px-2.5 text-sm",
      lg: "h-7 px-3 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
