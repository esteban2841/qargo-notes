// components/molecules/TaskForm.tsx
import { useState, useEffect } from 'react';
import { Task } from '../../../../types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useTaskStore } from '../../../../context/tasks/TaskStore';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const { addTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority
      });
    }
  }, [task]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (task) {
      updateTask(task._id, formData);
    } else {
      addTask({
        ...formData,
        _id: '', // or generate a temporary id if needed
        userId: '', // set the correct userId here
        completed: false
      });
    }
    
    onClose();
  };
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
            placeholder="Enter task title"
          />
          
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
            placeholder="Enter task description"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {task ? 'Update Task' : 'Add Task'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
