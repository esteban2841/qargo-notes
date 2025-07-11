// types/index.ts
export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  userId: string; // Assuming tasks are associated with a user
}

export interface TaskStore {
  filteredTasks: Task[];
  tasks: Task[];
  fetchTasks: (token?: string) => void;
  filterDataTask: (type: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (task: Task) => void;
}