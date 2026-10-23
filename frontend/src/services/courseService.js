import api from './api'

export const courseService = {
  /**
   * Fetch all courses with optional filters.
   * @param {object} params - { featured, limit, search, category, level, price, page }
   */
  getAll: (params = {}) =>
    api.get('/courses', { params }),

  /**
   * Fetch a single course by ID.
   */
  getById: (id) =>
    api.get(`/courses/${id}`),

  /**
   * Enroll the authenticated student in a course.
   */
  enroll: (courseId) =>
    api.post(`/courses/${courseId}/enroll`),
}
