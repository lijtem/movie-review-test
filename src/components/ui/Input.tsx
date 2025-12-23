import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded bg-surface border p-3 text-text-main
            focus:border-primary focus:ring-1 focus:ring-primary outline-none
            transition-colors duration-base
            ${error ? 'border-error' : 'border-neutral-700'}
            disabled:bg-surface-elevated/50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-text-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

