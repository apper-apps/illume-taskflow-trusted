class TaskService {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "project_id" } },
          { field: { Name: "is_recurring" } },
          { field: { Name: "recurring_pattern" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "due_date" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "project_id" } },
          { field: { Name: "is_recurring" } },
          { field: { Name: "recurring_pattern" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('task', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  }

  async create(taskData) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Name: taskData.Name || taskData.title,
          Tags: taskData.Tags,
          Owner: taskData.Owner,
          title: taskData.title,
          description: taskData.description,
          due_date: taskData.due_date || taskData.dueDate,
          priority: taskData.priority,
          status: taskData.status,
          project_id: taskData.project_id || taskData.projectId,
          is_recurring: taskData.is_recurring || taskData.isRecurring,
          recurring_pattern: taskData.recurring_pattern || taskData.recurringPattern,
          created_at: new Date().toISOString(),
          completed_at: taskData.completed_at || taskData.completedAt
        }]
      };
      
      const response = await this.apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create task');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating task:", error);
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
          ...(updates.title && { title: updates.title }),
          ...(updates.Tags !== undefined && { Tags: updates.Tags }),
          ...(updates.Owner !== undefined && { Owner: updates.Owner }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.due_date !== undefined && { due_date: updates.due_date }),
          ...(updates.dueDate !== undefined && { due_date: updates.dueDate }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
          ...(updates.status !== undefined && { status: updates.status }),
          ...(updates.project_id !== undefined && { project_id: updates.project_id }),
          ...(updates.projectId !== undefined && { project_id: updates.projectId }),
          ...(updates.is_recurring !== undefined && { is_recurring: updates.is_recurring }),
          ...(updates.isRecurring !== undefined && { is_recurring: updates.isRecurring }),
          ...(updates.recurring_pattern !== undefined && { recurring_pattern: updates.recurring_pattern }),
          ...(updates.recurringPattern !== undefined && { recurring_pattern: updates.recurringPattern }),
          ...(updates.created_at !== undefined && { created_at: updates.created_at }),
          ...(updates.completed_at !== undefined && { completed_at: updates.completed_at }),
          ...(updates.status === 'Completed' && { completed_at: new Date().toISOString() })
        }]
      };
      
      const response = await this.apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update task');
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete task');
        }
        
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();