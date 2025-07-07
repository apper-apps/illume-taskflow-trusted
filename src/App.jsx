import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import TaskForm from '@/components/organisms/TaskForm';
import Dashboard from '@/components/pages/Dashboard';
import AllTasks from '@/components/pages/AllTasks';
import Projects from '@/components/pages/Projects';
import Settings from '@/components/pages/Settings';
import { taskService } from '@/services/api/taskService';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleTaskClick = async (taskId) => {
    try {
      const task = await taskService.getById(taskId);
      setEditingTask(task);
      setShowTaskForm(true);
    } catch (error) {
      toast.error('Failed to load task details');
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.update(editingTask.Id, taskData);
        toast.success('Task updated successfully');
      } else {
        await taskService.create(taskData);
        toast.success('Task created successfully');
      }
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  const handleCancelTask = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const getPageTitle = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/tasks':
        return 'All Tasks';
      case '/projects':
        return 'Projects';
      case '/settings':
        return 'Settings';
      default:
        return 'TaskFlow Pro';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />
      
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          title={getPageTitle()}
          onNewTask={handleNewTask}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    onNewTask={handleNewTask}
                    onTaskClick={handleTaskClick}
                  />
                } 
              />
              <Route 
                path="/tasks" 
                element={
                  <AllTasks 
                    onNewTask={handleNewTask}
                    onTaskClick={handleTaskClick}
                  />
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <Projects 
                    onNewProject={() => toast.info('Project creation coming soon!')}
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    darkMode={darkMode}
                    onToggleDarkMode={handleToggleDarkMode}
                  />
                } 
              />
            </Routes>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={handleCancelTask}
          />
        )}
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;