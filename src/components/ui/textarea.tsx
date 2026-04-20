import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-patina-walnut"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-patina-espresso placeholder:text-patina-clay transition-colors focus:outline-none focus:ring-2 focus:ring-patina-verdigris-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px] resize-y",
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

Textarea.displayName = "Textarea";
