import api from './api'

export const instructorService = {
  getAll: () =>
    api.get('/instructors'),

  getMyCourses: () =>
    api.get('/instructor/courses'),

  getAssignments: () =>
    api.get('/instructor/assignments'),

  getStudents: () =>
    api.get('/instructor/students'),

  gradeAssignment: (assignmentId, payload) =>
    api.put(`/instructor/assignments/${assignmentId}/grade`, payload),

  updateProfile: (payload) =>
    api.put('/instructor/profile', payload),
}
