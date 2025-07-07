import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const DashboardStats = ({ stats, className }) => {
  const statCards = [
    {
      title: 'Tasks Due Today',
      value: stats.dueToday,
      icon: 'Calendar',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      title: 'Tasks Completed',
      value: stats.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: 'Clock',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      title: 'Overdue Tasks',
      value: stats.overdue,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hoverable className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn('p-3 rounded-full', stat.bgColor)}>
                <ApperIcon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;