import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon: Icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 px-4 bg-[#0A0D12] border rounded-lg text-white placeholder:text-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                : "border-gray-700 hover:border-gray-600",
              Icon && "pl-11",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
