import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const TaskStatusToggle = ({ status, onToggle, className }) => {
  const statusConfig = {
    'Not Started': { 
      color: 'text-gray-400 hover:text-gray-600', 
      bg: 'hover:bg-gray-100',
      icon: 'Circle'
    },
    'In Progress': { 
      color: 'text-primary-500 hover:text-primary-600', 
      bg: 'hover:bg-primary-50',
      icon: 'Clock'
    },
    'Completed': { 
      color: 'text-success hover:text-green-600', 
      bg: 'hover:bg-green-50',
      icon: 'CheckCircle'
    },
  };

  const config = statusConfig[status] || statusConfig['Not Started'];

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={cn(
        'p-2 rounded-full transition-colors duration-200',
        config.color,
        config.bg,
        className
      )}
    >
      <ApperIcon name={config.icon} size={20} />
    </motion.button>
  );
};

export default TaskStatusToggle;