import React from 'react';
import { cn } from '@/utils/cn';

const Textarea = React.forwardRef(({ 
  className, 
  error = false,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-border bg-white px-3 py-2 text-sm',
        'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        error && 'border-error focus:ring-error',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;