import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskFilters from '@/components/organisms/TaskFilters';
import TaskCard from '@/components/organisms/TaskCard';
import KanbanBoard from '@/components/organisms/KanbanBoard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService } from '@/services/api/taskService';
import { projectService } from '@/services/api/projectService';

const AllTasks = ({ onNewTask, onTaskClick }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    project: '',
  });

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
      toast.error('Failed to load tasks');
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

const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = !filters.search || 
        (task.title || task.Name || '').toLowerCase().includes(filters.search.toLowerCase()) ||
        (task.description || '').toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesProject = !filters.project || (task.project_id || task.projectId) === filters.project;
      
      return matchesSearch && matchesPriority && matchesStatus && matchesProject;
    });
  };

  const getProject = (projectId) => {
    return projects.find(p => p.Id === parseInt(projectId));
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const filteredTasks = getFilteredTasks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        onViewChange={setViewMode}
        currentView={viewMode}
      />
      
      {filteredTasks.length === 0 ? (
        <Empty
          title="No tasks found"
          description="No tasks match your current filters. Try adjusting the filters or create a new task."
          icon="Search"
          actionLabel="Create Task"
          onAction={onNewTask}
        />
      ) : (
        <div className="pb-6">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  project={getProject(task.projectId)}
                  onStatusChange={handleStatusChange}
                  onTaskClick={onTaskClick}
                />
              ))}
            </div>
          ) : (
            <KanbanBoard
              tasks={filteredTasks}
              projects={projects}
              onStatusChange={handleStatusChange}
              onTaskClick={onTaskClick}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AllTasks;