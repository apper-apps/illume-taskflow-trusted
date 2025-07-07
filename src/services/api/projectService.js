class ProjectService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "color" } },
          { field: { Name: "description" } },
          { field: { Name: "created_at" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "color" } },
          { field: { Name: "description" } },
          { field: { Name: "created_at" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('project', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  }

  async create(projectData) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Name: projectData.Name || projectData.name,
          Tags: projectData.Tags,
          Owner: projectData.Owner,
          color: projectData.color,
          description: projectData.description,
          created_at: new Date().toISOString()
        }]
      };
      
      const response = await this.apperClient.createRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create project');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.Name && { Name: updates.Name }),
          ...(updates.name && { Name: updates.name }),
          ...(updates.Tags !== undefined && { Tags: updates.Tags }),
          ...(updates.Owner !== undefined && { Owner: updates.Owner }),
          ...(updates.color !== undefined && { color: updates.color }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.created_at !== undefined && { created_at: updates.created_at })
        }]
      };
      
      const response = await this.apperClient.updateRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update project');
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord('project', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete project');
        }
        
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();