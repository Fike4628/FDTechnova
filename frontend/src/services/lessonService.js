import api from './api'

export const lessonService = {
  getByCourse: (courseId) =>
    api.get(`/courses/${courseId}/lessons`),

  getById: (id) =>
    api.get(`/lessons/${id}`),

  create: (payload) =>
    api.post('/lessons', payload),

  update: (id, payload) =>
    api.put(`/lessons/${id}`, payload),

  remove: (id) =>
    api.delete(`/lessons/${id}`),
}
