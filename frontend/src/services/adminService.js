import api from './api'

export const adminService = {
  // Courses
  getCourses: () => api.get('/admin/courses'),
  getCourseById: (id) => api.get(`/admin/courses/${id}`),
  createCourse: (payload) => api.post('/admin/courses', payload),
  updateCourse: (id, payload) => api.put(`/admin/courses/${id}`, payload),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),

  // Categories
  getCategories: () => api.get('/admin/categories'),
  createCategory: (payload) => api.post('/admin/categories', payload),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),

  // Users
  getStudents: () => api.get('/admin/students'),
  getInstructors: () => api.get('/admin/instructors'),
  deactivateUser: (id) => api.put(`/admin/users/${id}/deactivate`),

  // Enrollments
  getEnrollments: () => api.get('/admin/enrollments'),

  // Schedules
  getSchedules: () => api.get('/admin/schedules'),
  createSchedule: (payload) => api.post('/admin/schedules', payload),

  // Announcements
  getAnnouncements: () => api.get('/admin/announcements'),
  createAnnouncement: (payload) => api.post('/admin/announcements', payload),

  // Payments
  getPayments: () => api.get('/admin/payments'),

  // Reports
  getReports: () => api.get('/admin/reports'),
}
