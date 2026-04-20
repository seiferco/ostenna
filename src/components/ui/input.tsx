import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-patina-walnut"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-patina-espresso placeholder:text-patina-clay transition-colors focus:outline-none focus:ring-2 focus:ring-patina-verdigris-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-patina-error focus:ring-patina-error"
              : "border-patina-sand",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-patina-error">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
