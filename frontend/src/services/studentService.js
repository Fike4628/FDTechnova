import api from './api'

export const studentService = {
  getMyCourses: () =>
    api.get('/student/courses'),

  getMyAssignments: () =>
    api.get('/student/assignments'),

  getMyResults: () =>
    api.get('/student/results'),

  getMySchedule: () =>
    api.get('/student/schedule'),

  updateProfile: (payload) =>
    api.put('/student/profile', payload),
}
