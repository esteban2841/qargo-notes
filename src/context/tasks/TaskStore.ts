// store/taskStore.ts
'use client'
import { create } from 'zustand';
import { Task, TaskStore } from '@/types'; // Make sure to import from your updated types file

const uri = process.env.NEXT_PUBLIC_BACKEND_URI;

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  // --- API Interaction Functions ---

  // Fetches all tasks for the current user
  fetchTasks: async () => {
    try {
      const response = await fetch(uri + '/task');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.ok) {
        set({ tasks: [...result.data] });
      } else {
        console.error('Failed to fetch tasks:', result.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error, e.g., show a user-friendly message
    }
  },

  // Adds a new task
  addTask: async (taskData) => {
    try {
      const response = await fetch(uri + '/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.data) {
        // Add the new task (with _id and timestamps from backend) to the store
        set((state) => ({
          tasks: [...state.tasks, result.data],
        }));
      } else {
        console.error('Failed to add task:', result.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },

  // Updates an existing task
  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.ok) {
        // Update the task in the store with the latest data from the backend
        set((state) => ({
          tasks: state.tasks.map(task =>
            task._id === id
              ? { ...task, ...result.data } // Use data from backend to ensure consistency
              : task
          ),
        }));
      } else {
        console.error('Failed to update task:', result.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  // Deletes a task
  deleteTask: async (id) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.ok) {
        // Remove the task from the store
        set((state) => ({
          tasks: state.tasks.filter(task => task._id !== id),
        }));
      } else {
        console.error('Failed to delete task:', result.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },

  // Toggles the completion status of a task
  toggleComplete: async (task) => {
    // Optimistic update: Update UI first, then send API request
    set((state) => ({
      tasks: state.tasks.map(task =>
        task._id === task._id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } // Update locally
          : task
      ),
    }));

    const currentTask = get().tasks.find(task => task._id === task._id);
    if (!currentTask) return;

    try {
      const response = await fetch(`/api/task/${task?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...currentTask}), // Send the new completed status
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.ok) {
        console.error('Failed to toggle completion:', result.message);
        // Revert optimistic update if API call fails
        set((state) => ({
          tasks: state.tasks.map(task =>
            task._id === task._id
              ? { ...task, completed: currentTask.completed } // Revert to original
              : task
          ),
        }));
      }
      // If successful, the optimistic update is already in place.
      // If the backend returns the updated task, you could use result.data here
      // to ensure the local state is perfectly synced with the backend,
      // especially for `updatedAt` timestamp.
    } catch (error) {
      console.error('Error toggling completion:', error);
      // Revert optimistic update on network error
      set((state) => ({
        tasks: state.tasks.map(task =>
          task._id === task._id
            ? { ...task, completed: currentTask.completed }
            : task
        ),
      }));
    }
  },
}));


//tengo una app en next 14 que usa mongoose necesito usar para este crud que te voy a pasar como ejemplo, los endpoints de /api/task, para el primer render debe obtener todas las notas del usuario actual modifica el codigo para que se use cada metodo HTTP para traer de mongo todo