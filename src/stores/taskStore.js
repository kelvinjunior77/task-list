import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);

  // Carrega tarefas do localStorage
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  };
  
  // Salva tarefas no localStorage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  // Adiciona uma nova tarefa
  const addTask = (task) => {
    tasks.value.push({
      ...task,
      id: Date.now().toString()
    });
    saveTasks();
  };

  // Atualiza uma tarefa existente
  const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
      saveTasks();
    }
  };

  // Remove uma tarefa
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
    saveTasks();
  };

  return {
    tasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask
  };
});