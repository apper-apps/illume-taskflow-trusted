import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Sidebar = ({ isOpen, onClose, darkMode }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'Home' },
    { name: 'All Tasks', href: '/tasks', icon: 'CheckSquare' },
    { name: 'Projects', href: '/projects', icon: 'FolderOpen' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-full bg-white border-r border-border dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center h-16 px-6 border-b border-border dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-display">
                    TaskFlow Pro
                  </h1>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                    )
                  }
                >
                  <ApperIcon name={item.icon} size={18} />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border dark:bg-gray-800 dark:border-gray-700 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-border dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Zap" size={20} className="text-white" />
                  </div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-display">
                    TaskFlow Pro
                  </h1>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                      )
                    }
                  >
                    <ApperIcon name={item.icon} size={18} />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;