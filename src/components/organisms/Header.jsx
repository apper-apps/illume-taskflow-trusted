import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Header = ({ 
  title, 
  subtitle, 
  onNewTask, 
  onMenuToggle,
  className 
}) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border bg-white/80 backdrop-blur-md',
        'dark:bg-gray-900/80 dark:border-gray-700',
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onNewTask}
            size="sm"
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;