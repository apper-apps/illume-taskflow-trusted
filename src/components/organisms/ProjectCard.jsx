import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const ProjectCard = ({ project, onProjectClick, className }) => {
  const progressPercentage = project.taskCount > 0 
    ? Math.round((project.completedCount / project.taskCount) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={cn(className)}
    >
      <Card
        hoverable
        onClick={() => onProjectClick(project.Id)}
        className="p-6 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <ApperIcon name="FolderOpen" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.taskCount} tasks
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {progressPercentage}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Complete
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{project.completedCount}/{project.taskCount}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary-500 h-2 rounded-full"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" size={14} />
            Created {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="CheckCircle" size={14} />
            {project.completedCount} done
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;