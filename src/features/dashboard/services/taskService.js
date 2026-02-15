import api from '../../../shared/utils/api';

export const taskService = {
  getAllTasks: async (page = 1, limit = 10) => {
    const response = await api.get('/tasks', {
      params: { _page: page, _limit: limit, _sort: 'dueDate' },
    });
    return response.data;
  },

  getDashboardTasks: async (page = 1, limit = 6) => {
    const response = await api.get('/tasks', {
      params: { _page: page, _limit: limit, _sort: 'dueDate' },
    });
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.patch(`/tasks/${id}`, taskData);
    return response.data;
  },

  editTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
