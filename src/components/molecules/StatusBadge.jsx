import React from 'react';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const StatusBadge = ({ status, showIcon = true, size = 'md' }) => {
  const statusConfig = {
    'Not Started': { variant: 'default', icon: 'Circle' },
    'In Progress': { variant: 'primary', icon: 'Clock' },
    'Completed': { variant: 'success', icon: 'CheckCircle' },
  };

  const config = statusConfig[status] || statusConfig['Not Started'];

  return (
    <Badge variant={config.variant} size={size}>
      {showIcon && <ApperIcon name={config.icon} size={12} />}
      {status}
    </Badge>
  );
};

export default StatusBadge;