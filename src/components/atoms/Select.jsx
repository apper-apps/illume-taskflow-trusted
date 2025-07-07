import React from 'react';
import { cn } from '@/utils/cn';

const Select = React.forwardRef(({ 
  className, 
  error = false,
  children,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        error && 'border-error focus:ring-error',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;