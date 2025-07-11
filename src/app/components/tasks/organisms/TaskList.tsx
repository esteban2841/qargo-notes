'use client'
// components/organisms/TaskList.tsx
import { useEffect, useState } from 'react';
import { Task } from '@/types';
import { TaskCard } from '../molecules/TaskCard';
import { TaskForm } from '../molecules/TaskForm';
import { Button } from '../atoms/Button';
import { useTaskStore } from '@/context/tasks/TaskStore';

export const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, [fetchTasks]);
  
  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };
  
  return (
    <div className="w-full h-full p-8 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full justify-between">
        <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
        <Button onClick={handleAddTask}>
          Add New Task
        </Button>
      </div>
      
      <div className="flex space-x-2">
        {(['all', 'active', 'completed'] as const).map(filterType => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Button>
        ))}
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {filter === 'all' 
              ? 'No tasks yet. Add your first task to get started!'
              : `No ${filter} tasks found.`
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
          ))}
        </div>
      )}
      
      {showForm && (
        <TaskForm task={editingTask} onClose={handleCloseForm} />
      )}
    </div>
  );
};
