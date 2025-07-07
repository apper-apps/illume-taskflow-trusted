import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-medium',
    secondary: 'bg-surface hover:bg-gray-100 text-gray-900 border border-border shadow-soft',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-soft hover:shadow-medium',
    ghost: 'hover:bg-gray-100 text-gray-700 hover:text-gray-900',
    danger: 'bg-error hover:bg-red-600 text-white shadow-soft',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;