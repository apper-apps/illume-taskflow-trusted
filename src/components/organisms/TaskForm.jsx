import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const TaskForm = ({ task, onSave, onCancel, className }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Not Started',
    projectId: '',
    isRecurring: false,
    recurringPattern: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
        priority: task.priority || 'Medium',
        status: task.status || 'Not Started',
        projectId: task.projectId || '',
        isRecurring: task.isRecurring || false,
        recurringPattern: task.recurringPattern || '',
      });
    }
  }, [task]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    if (formData.isRecurring && !formData.recurringPattern) {
      newErrors.recurringPattern = 'Recurring pattern is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      projectId: formData.projectId || null,
      recurringPattern: formData.isRecurring ? formData.recurringPattern : null,
    };

    onSave(taskData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn('fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50', className)}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-display">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Title"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              placeholder="Enter task title..."
            />

            <FormField
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description..."
              className="min-h-[100px]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Due Date"
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                error={errors.dueDate}
              />

              <FormField
                label="Priority"
                type="select"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Status"
                type="select"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </FormField>

              <FormField
                label="Project"
                type="select"
                value={formData.projectId}
                onChange={(e) => handleChange('projectId', e.target.value)}
              >
                <option value="">Select Project</option>
                <option value="1">Website Redesign</option>
                <option value="2">Mobile App</option>
                <option value="3">Marketing Campaign</option>
              </FormField>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onChange={(e) => handleChange('isRecurring', e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Make this a recurring task
                </label>
              </div>

              <AnimatePresence>
                {formData.isRecurring && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FormField
                      label="Recurring Pattern"
                      type="select"
                      value={formData.recurringPattern}
                      onChange={(e) => handleChange('recurringPattern', e.target.value)}
                      error={errors.recurringPattern}
                    >
                      <option value="">Select Pattern</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </FormField>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskForm;