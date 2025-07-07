import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item",
  icon = "Inbox",
  actionLabel = "Create New",
  onAction,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;