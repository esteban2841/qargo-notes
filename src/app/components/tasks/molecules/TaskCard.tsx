
// components/molecules/TaskCard.tsx
import { Task } from '../../../../types';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { useTaskStore } from '../../../../context/tasks/TaskStore';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { toggleComplete, deleteTask } = useTaskStore();
  
  const handleToggleComplete = () => toggleComplete(task);
  const handleDelete = () => deleteTask(task._id);
  const handleEdit = () => onEdit(task);
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-amber-600 transition-colors duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
            {task.title}
          </h3>
          <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-600' : 'text-gray-300'}`}>
            {task.description}
          </p>
        </div>
        <Badge variant={task.priority} className="ml-2">
          {task.priority}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Created: {task?.createdAt instanceof Date ? task.createdAt.toLocaleString() : String(task?.createdAt)}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={()=>handleToggleComplete()}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? '↩️' : '✅'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            aria-label="Edit task"
          >
            ✏️
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
};
