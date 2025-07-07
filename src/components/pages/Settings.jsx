import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Settings = ({ darkMode, onToggleDarkMode }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    defaultView: 'list',
    reminderTime: '1',
  });

  useEffect(() => {
    setSettings(prev => ({ ...prev, darkMode }));
  }, [darkMode]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      onToggleDarkMode();
    }
    
    toast.success('Settings updated');
  };

  const settingSections = [
    {
      title: 'Appearance',
      icon: 'Palette',
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Toggle between light and dark themes',
          type: 'toggle',
          value: settings.darkMode,
        },
        {
          key: 'defaultView',
          label: 'Default View',
          description: 'Choose your preferred task view',
          type: 'select',
          value: settings.defaultView,
          options: [
            { value: 'list', label: 'List View' },
            { value: 'kanban', label: 'Kanban Board' },
          ],
        },
      ],
    },
    {
      title: 'Notifications',
      icon: 'Bell',
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Receive notifications for task reminders',
          type: 'toggle',
          value: settings.notifications,
        },
        {
          key: 'reminderTime',
          label: 'Default Reminder Time',
          description: 'Set default reminder time before due date',
          type: 'select',
          value: settings.reminderTime,
          options: [
            { value: '0.25', label: '15 minutes' },
            { value: '1', label: '1 hour' },
            { value: '24', label: '1 day' },
          ],
        },
      ],
    },
    {
      title: 'Productivity',
      icon: 'Zap',
      settings: [
        {
          key: 'autoSave',
          label: 'Auto-Save',
          description: 'Automatically save changes as you work',
          type: 'toggle',
          value: settings.autoSave,
        },
      ],
    },
  ];

  const renderSettingControl = (setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <button
            onClick={() => handleSettingChange(setting.key, !setting.value)}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              setting.value ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                setting.value ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        );
      
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className="block w-32 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          >
            {setting.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your TaskFlow Pro experience
        </p>
      </div>
      
      <div className="space-y-6">
        {settingSections.map(section => (
          <Card key={section.title} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={section.icon} size={18} className="text-primary-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-4">
              {section.settings.map(setting => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-border dark:border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {renderSettingControl(setting)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={18} className="text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Danger Zone
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Clear All Data
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete all tasks and projects. This action cannot be undone.
              </p>
            </div>
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Clear Data
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Settings;