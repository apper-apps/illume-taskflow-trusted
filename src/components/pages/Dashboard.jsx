import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import DashboardStats from '@/components/organisms/DashboardStats';
import TaskChart from '@/components/organisms/TaskChart';
import TaskCard from '@/components/organisms/TaskCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService } from '@/services/api/taskService';
import { projectService } from '@/services/api/projectService';

const Dashboard = ({ onNewTask, onTaskClick }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [tasksData, projectsData] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ]);
      
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskService.update(taskId, { status: newStatus });
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      toast.success(`Task ${newStatus.toLowerCase()}`);
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      dueToday: tasks.filter(task => {
        const dueDate = new Date(task.due_date || task.dueDate);
        return dueDate >= today && dueDate < tomorrow && task.status !== 'Completed';
      }).length,
      completed: tasks.filter(task => task.status === 'Completed').length,
      inProgress: tasks.filter(task => task.status === 'In Progress').length,
      overdue: tasks.filter(task => {
        const dueDate = new Date(task.due_date || task.dueDate);
        return dueDate < today && task.status !== 'Completed';
      }).length,
    };
  };

  const getChartData = () => {
    const statusCounts = {
      'Not Started': tasks.filter(t => t.status === 'Not Started').length,
      'In Progress': tasks.filter(t => t.status === 'In Progress').length,
      'Completed': tasks.filter(t => t.status === 'Completed').length,
    };

    return {
      labels: Object.keys(statusCounts),
      series: Object.values(statusCounts),
    };
  };

  const getTodaysTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks.filter(task => {
      const dueDate = new Date(task.due_date || task.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    }).slice(0, 5);
  };

  const getProject = (projectId) => {
    return projects.find(p => p.Id === parseInt(projectId));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Loading type="stats" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Loading />
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const stats = calculateStats();
  const chartData = getChartData();
  const todaysTasks = getTodaysTasks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskChart
          data={chartData}
          title="Task Status Distribution"
          type="donut"
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Today's Tasks
            </h3>
            {todaysTasks.length > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {todaysTasks.length} tasks
              </span>
            )}
          </div>
          
          {todaysTasks.length === 0 ? (
            <Empty
              title="No tasks due today"
              description="You're all caught up! Create a new task to get started."
              icon="Calendar"
              actionLabel="Create Task"
              onAction={onNewTask}
            />
          ) : (
            <div className="space-y-3">
              {todaysTasks.map(task => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  project={getProject(task.projectId)}
                  onStatusChange={handleStatusChange}
                  onTaskClick={onTaskClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;