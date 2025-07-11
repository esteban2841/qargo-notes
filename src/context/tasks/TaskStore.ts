// store/taskStore.ts
'use client'
import { create } from 'zustand';
import { TaskStore } from '../../types'; // Make sure to import from your updated types file

const uri = process.env.NEXT_PUBLIC_BACKEND_URI;
console.log("🚀 ~ uri:", uri)

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],

  // --- API Interaction Functions ---

  // Fetches all tasks for the current user
  fetchTasks: async (token?: string) => {
    console.log("🚀 ~ fetchTasks: ~ token:", token, localStorage.getItem('token'))
    try {
      const response = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.ok) {
        set({ tasks: [...result.data], filteredTasks: [...result.data] });
      } else {
        console.error('Failed to fetch tasks:', result.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error, e.g., show a user-friendly message
    }
  },

  filterDataTask: async (type: string) => {
    if(type == 'all'){
      set((state) => ({
          filteredTasks: [...state.tasks].map(task =>
            task
        ),
      }));
    }
    if(type == 'active'){
      set((state) => ({
          filteredTasks: [...state.tasks].filter(task =>
            task.completed == false
        ),
      }));
    }
    if(type == 'completed'){
      set((state) => ({
          filteredTasks: [...state.tasks].filter(task =>
            task.completed == true
        ),
      }));
    }
  },

  // Adds a new task
  addTask: async (task) => {
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.data) {
        // Add the new task (with _id and timestamps from backend) to the store
        set((state) => ({
          tasks: [...state.tasks, result.data],
          filteredTasks: [...state.tasks, result.data],
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
          filteredTasks: state.tasks.map(task =>
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
          filteredTasks: state.tasks.filter(task => task._id !== id),
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

  const currentTask = get().tasks.find(tasky => tasky._id === task._id);
  if (!currentTask) return;

  try {
    const response = await fetch(`/api/task/${task?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the updated completed status from currentTask, which now reflects the optimistic update
      body: JSON.stringify({ completed: !currentTask.completed }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.ok) {
      console.error('Failed to toggle completion:', result.message);
      // Revert optimistic update if API call fails
      set((state) => ({
        tasks: state.tasks.map(tasky =>
          tasky._id === task._id
            ? { ...tasky, completed: currentTask.completed } // Revert to original
            : tasky
        ),
        filteredTasks: state.filteredTasks.map(tasky => // Revert filteredTasks as well
          tasky._id === task._id
            ? { ...tasky, completed: currentTask.completed }
            : tasky
        ),
      }));
    }
    // If successful, the optimistic update is already in place.
    // If the backend returns the updated task, you could use result.data here
    // to ensure the local state is perfectly synced with the backend,
    // especially for `updatedAt` timestamp.
    // The previous `set` call for tasks and filteredTasks after the API call is now redundant
    // because the optimistic update already handled it correctly.
    // If you need to update with the *server's* returned data (e.g., for `updatedAt` precision),
    // you would do it here using `result.data`.
    // Example:
    if (result.data) {
      set((state) => ({
        tasks: state.tasks.map(tasky =>
          tasky._id === result.data._id
            ? { ...result.data }
            : tasky
        ),
        filteredTasks: state.filteredTasks.map(tasky =>
          tasky._id === result.data._id
            ? { ...result.data }
            : tasky
        ),
      }));
    }

  } catch (error) {
    console.error('Error toggling completion:', error);
    // Revert optimistic update on network error
    set((state) => ({
      tasks: state.tasks.map(tasky =>
        tasky._id === task._id
          ? { ...tasky, completed: currentTask.completed }
          : tasky
      ),
      filteredTasks: state.filteredTasks.map(tasky => // Revert filteredTasks as well
        tasky._id === task._id
          ? { ...tasky, completed: currentTask.completed }
          : tasky
      ),
    }));
  }
},
}));


//tengo una app en next 14 que usa mongoose necesito usar para este crud que te voy a pasar como ejemplo, los endpoints de /api/task, para el primer render debe obtener todas las notas del usuario actual modifica el codigo para que se use cada metodo HTTP para traer de mongo todo