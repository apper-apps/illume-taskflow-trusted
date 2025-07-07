import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className, 
  hoverable = false,
  children,
  ...props 
}, ref) => {
  const cardProps = hoverable ? {
    whileHover: { scale: 1.02, y: -2 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-xl bg-white border border-border shadow-card',
        'dark:bg-gray-800 dark:border-gray-700',
        hoverable && 'hover:shadow-card-hover cursor-pointer',
        className
      )}
      {...cardProps}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;