import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Card from '@/components/atoms/Card';
import PriorityBadge from '@/components/molecules/PriorityBadge';
import StatusBadge from '@/components/molecules/StatusBadge';
import TaskStatusToggle from '@/components/molecules/TaskStatusToggle';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const TaskCard = ({ task, project, onStatusChange, onTaskClick, className, dragHandleProps, isDragging }) => {
  const handleStatusToggle = (e) => {
    e.stopPropagation();
    const statusFlow = {
      'Not Started': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Not Started'
    };
    onStatusChange(task.Id, statusFlow[task.status]);
};

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'Completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className={cn(
        className,
        isDragging && 'opacity-50 rotate-2 scale-105'
      )}
    >
      <Card
        hoverable
        onClick={() => onTaskClick(task.Id)}
        className={cn(
          'p-4 cursor-pointer transition-all duration-200',
          task.status === 'Completed' && 'opacity-75',
          isOverdue && 'border-l-4 border-l-error'
        )}
      >
<div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <TaskStatusToggle
                status={task.status}
                onToggle={handleStatusToggle}
              />
              <h3 className={cn(
                'font-medium text-gray-900 dark:text-gray-100 truncate',
task.status === 'Completed' && 'line-through text-gray-500'
              )}>
                {task.title || task.Name}
              </h3>
            </div>
            
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 mb-3">
              <PriorityBadge priority={task.priority} size="sm" />
              <StatusBadge status={task.status} size="sm" />
            </div>
            
<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                {task.due_date && (
                  <div className={cn(
                    'flex items-center gap-1',
                    isOverdue && 'text-error font-medium'
                  )}>
                    <ApperIcon name="Calendar" size={12} />
                    {format(new Date(task.due_date), 'MMM d')}
                  </div>
                )}
                
{project && (
                  <div className="flex items-center gap-1">
                    <ApperIcon name="FolderOpen" size={12} />
                    {project.Name || project.name}
                  </div>
                )}
{task.is_recurring && (
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Repeat" size={12} />
                    {task.recurring_pattern}
                  </div>
                )}
              </div>
              
<div className="text-xs text-gray-400">
                {format(new Date(task.created_at || task.CreatedOn), 'MMM d')}
              </div>
            </div>
          </div>
          
          <div
            {...dragHandleProps}
            className="flex-shrink-0 opacity-30 hover:opacity-60 transition-opacity cursor-grab active:cursor-grabbing"
          >
            <ApperIcon name="GripVertical" size={16} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;