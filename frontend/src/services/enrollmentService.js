import api from './api'

export const enrollmentService = {
  getAll: () =>
    api.get('/enrollments'),

  getById: (id) =>
    api.get(`/enrollments/${id}`),

  create: (payload) =>
    api.post('/enrollments', payload),

  update: (id, payload) =>
    api.put(`/enrollments/${id}`, payload),

  remove: (id) =>
    api.delete(`/enrollments/${id}`),
}
