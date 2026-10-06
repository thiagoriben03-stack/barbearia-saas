import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 pr-10 bg-[#0A0D12] border rounded-lg text-white appearance-none",
              "transition-all duration-200 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                : "border-gray-700 hover:border-gray-600",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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

Select.displayName = "Select";

export { Select };
