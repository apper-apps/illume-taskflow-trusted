import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProjectCard from '@/components/organisms/ProjectCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { projectService } from '@/services/api/projectService';
import { taskService } from '@/services/api/taskService';

const Projects = ({ onNewProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ]);
      
      // Calculate task counts for each project
const projectsWithStats = projectsData.map(project => {
        const projectTasks = tasksData.filter(task => (task.project_id || task.projectId) === project.Id.toString());
        return {
          ...project,
          taskCount: projectTasks.length,
          completedCount: projectTasks.filter(task => task.status === 'Completed').length,
        };
      });
      
      setProjects(projectsWithStats);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProjectClick = (projectId) => {
    // Navigate to project details or filter tasks by project
    console.log('View project:', projectId);
    toast.info('Project details coming soon!');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Loading key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your project progress
          </p>
        </div>
      </div>
      
      {projects.length === 0 ? (
        <Empty
          title="No projects found"
          description="Create your first project to organize your tasks and track progress."
          icon="FolderOpen"
          actionLabel="Create Project"
          onAction={onNewProject}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.Id}
              project={project}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Projects;