import React from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { cn } from '@/utils/cn';

const KanbanBoard = ({ tasks, projects, onStatusChange, onTaskClick, className }) => {
  const columns = [
    { id: 'Not Started', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-primary-50 dark:bg-primary-900/20' },
    { id: 'Completed', title: 'Done', color: 'bg-green-50 dark:bg-green-900/20' },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getProject = (projectId) => {
    return projects.find(p => p.Id === parseInt(projectId));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const taskId = parseInt(draggableId);
    const newStatus = destination.droppableId;
    
    onStatusChange(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
<div className={cn('flex gap-6 overflow-x-auto pb-6', className)}>
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 w-80"
            >
              <div className={cn(
                'rounded-lg p-4 min-h-[600px]',
                column.color
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {column.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cn(
                        'space-y-3 min-h-[400px] transition-colors',
                        snapshot.isDraggingOver && 'bg-white/50 dark:bg-gray-700/50 rounded-lg'
                      )}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.Id}
                          draggableId={task.Id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                            >
<TaskCard
                                task={task}
                                project={getProject(task.project_id || task.projectId)}
                                onStatusChange={onStatusChange}
                                onTaskClick={onTaskClick}
                                dragHandleProps={provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {columnTasks.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <p className="text-sm">No tasks in this column</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;