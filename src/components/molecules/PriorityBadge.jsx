import React from 'react';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const PriorityBadge = ({ priority, showIcon = true, size = 'md' }) => {
  const priorityConfig = {
    High: { variant: 'high', icon: 'AlertCircle' },
    Medium: { variant: 'medium', icon: 'Circle' },
    Low: { variant: 'low', icon: 'Minus' },
  };

  const config = priorityConfig[priority] || priorityConfig.Medium;

  return (
    <Badge variant={config.variant} size={size}>
      {showIcon && <ApperIcon name={config.icon} size={12} />}
      {priority}
    </Badge>
  );
};

export default PriorityBadge;