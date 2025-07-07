import mockProjects from '@/services/mockData/projects.json';

class ProjectService {
  constructor() {
    this.projects = [...mockProjects];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...this.projects];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const project = this.projects.find(p => p.Id === parseInt(id));
    if (!project) throw new Error('Project not found');
    return { ...project };
  }

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newProject = {
      Id: Math.max(...this.projects.map(p => p.Id), 0) + 1,
      ...projectData,
      createdAt: new Date().toISOString(),
    };
    
    this.projects.push(newProject);
    return { ...newProject };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error('Project not found');
    
    this.projects[index] = { ...this.projects[index], ...updates };
    return { ...this.projects[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error('Project not found');
    
    this.projects.splice(index, 1);
    return { success: true };
  }
}

export const projectService = new ProjectService();