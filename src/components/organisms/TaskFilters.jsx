import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const TaskFilters = ({ 
  filters, 
  onFiltersChange, 
  onViewChange, 
  currentView = 'list',
  className 
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const viewOptions = [
    { value: 'list', icon: 'List', label: 'List' },
    { value: 'kanban', icon: 'Columns', label: 'Kanban' },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'flex flex-col sm:flex-row gap-4 p-4 bg-surface dark:bg-gray-800 rounded-lg border border-border dark:border-gray-700',
        className
      )}
    >
      <div className="flex-1">
        <SearchBar
          placeholder="Search tasks..."
          onSearch={(value) => handleFilterChange('search', value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.priority || ''}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="min-w-[120px]"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        
        <Select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="min-w-[120px]"
        >
          <option value="">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Select>
        
        <Select
          value={filters.project || ''}
          onChange={(e) => handleFilterChange('project', e.target.value)}
          className="min-w-[120px]"
        >
          <option value="">All Projects</option>
          <option value="1">Website Redesign</option>
          <option value="2">Mobile App</option>
          <option value="3">Marketing Campaign</option>
        </Select>
        
        <div className="flex border border-border rounded-lg overflow-hidden">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentView === option.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewChange(option.value)}
              className="rounded-none border-0"
            >
              <ApperIcon name={option.icon} size={16} />
              <span className="hidden sm:inline">{option.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskFilters;