import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { setUser, clearUser } from './store/userSlice';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import TaskForm from '@/components/organisms/TaskForm';
import Dashboard from '@/components/pages/Dashboard';
import AllTasks from '@/components/pages/AllTasks';
import Projects from '@/components/pages/Projects';
import Settings from '@/components/pages/Settings';
import Login from '@/components/pages/Login';
import Signup from '@/components/pages/Signup';
import Callback from '@/components/pages/Callback';
import ErrorPage from '@/components/pages/ErrorPage';
import ResetPassword from '@/components/pages/ResetPassword';
import PromptPassword from '@/components/pages/PromptPassword';
import { taskService } from '@/services/api/taskService';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || 
                           currentPath.includes('/callback') || currentPath.includes('/error') || 
                           currentPath.includes('/prompt-password') || currentPath.includes('/reset-password');
        
        if (user) {
          // User is authenticated
          if (redirectPath) {
            navigate(redirectPath);
          } else if (!isAuthPage) {
            if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
              navigate(currentPath);
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
          // Store user information in Redux
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
          // User is not authenticated
          if (!isAuthPage) {
            navigate(
              currentPath.includes('/signup')
                ? `/signup?redirect=${currentPath}`
                : currentPath.includes('/login')
                ? `/login?redirect=${currentPath}`
                : '/login'
            );
          } else if (redirectPath) {
            if (
              !['error', 'signup', 'login', 'callback', 'prompt-password', 'reset-password'].some((path) => currentPath.includes(path))
            ) {
              navigate(`/login?redirect=${redirectPath}`);
            } else {
              navigate(currentPath);
            }
          } else if (isAuthPage) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
          dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
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

  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  // Don't render routes until initialization is complete
  if (!isInitialized) {
    return <div className="loading flex items-center justify-center p-6 h-full w-full"><svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2v4"></path><path d="m16.2 7.8 2.9-2.9"></path><path d="M18 12h4"></path><path d="m16.2 16.2 2.9 2.9"></path><path d="M12 18v4"></path><path d="m4.9 19.1 2.9-2.9"></path><path d="M2 12h4"></path><path d="m4.9 4.9 2.9 2.9"></path></svg></div>;
  }

  // Show authentication pages for non-authenticated users
  if (!isAuthenticated) {
    return (
      <AuthContext.Provider value={authMethods}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/prompt-password/:appId/:emailAddress/:provider" element={<PromptPassword />} />
          <Route path="/reset-password/:appId/:fields" element={<ResetPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authMethods}>
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
            onLogout={authMethods.logout}
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
    </AuthContext.Provider>
  );
}

export default App;