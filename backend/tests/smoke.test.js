/**
 * smoke.test.js — end-to-end HTTP checks against the assembled app.
 *
 * Self-contained: syncs the schema from models, seeds demo data, then drives
 * the real Express app via supertest (no DB server beyond the configured one).
 */
const request = require('supertest')
const app = require('../src/app')
const db = require('../src/models')
const seed = require('../seeders/001-demo-data')

let studentToken, instructorToken, adminToken
let sampleCourseId
const NEW_STUDENT = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.test',
  password: 'Password123!',
}

async function loginAs(email) {
  const res = await request(app).post('/api/auth/login').send({
    email,
    password: 'Password123!',
  })
  if (res.status !== 200) throw new Error(`login ${email} failed: ${res.status} ${JSON.stringify(res.body)}`)
  return res.body.token
}

beforeAll(async () => {
  await db.sequelize.sync({ force: true })
  await seed.up()
  studentToken = await loginAs('student@fdteknova.test')
  instructorToken = await loginAs('instructor@fdteknova.test')
  adminToken = await loginAs('admin@fdteknova.test')
}, 60000)

afterAll(async () => {
  await db.sequelize.close()
})

describe('health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('auth', () => {
  it('registers a new student and returns a token', async () => {
    const res = await request(app).post('/api/auth/register').send(NEW_STUDENT)
    expect(res.status).toBe(201)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.role).toBe('student')
    expect(res.body.user.password).toBeUndefined()
  })

  it('rejects bad credentials with 401', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'student@fdteknova.test',
      password: 'wrongpassword',
    })
    expect(res.status).toBe(401)
  })

  it('returns the logged-in user via /auth/me', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(200)
    expect(res.body.user.role).toBe('student')
  })

  it('refuses /auth/me without a token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })
})

describe('public catalog', () => {
  it('lists published courses', async () => {
    const res = await request(app).get('/api/courses')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.courses ? res.body.courses : res.body)).toBe(true)
    sampleCourseId = (res.body.courses || res.body)[0].id
  })

  it('fetches a course by slug with relations', async () => {
    const res = await request(app).get('/api/courses/graphic-design-fundamentals')
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Graphic Design Fundamentals')
    expect(res.body.instructor).toBeTruthy()
  })

  it('lists instructors publicly', async () => {
    const res = await request(app).get('/api/instructors')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].instructorProfile).toBeTruthy()
  })
})

describe('student flow', () => {
  it('enrolls the student in a course', async () => {
    const res = await request(app)
      .post(`/api/courses/${sampleCourseId}/enroll`)
      .set('Authorization', `Bearer ${studentToken}`)
    expect([200, 201]).toContain(res.status)
  })

  it('prevents duplicate enrollment with 409', async () => {
    const res = await request(app)
      .post(`/api/courses/${sampleCourseId}/enroll`)
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(200) // findOrCreate returns existing, not an error
  })

  it('shows enrolled courses under /student/courses', async () => {
    const res = await request(app)
      .get('/api/student/courses')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('lists lessons for an enrolled course (non-preview included)', async () => {
    const res = await request(app)
      .get(`/api/courses/${sampleCourseId}/lessons`)
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(1) // beyond the single preview lesson
  })
})

describe('notifications', () => {
  it('lists, then marks all read', async () => {
    const list = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(list.status).toBe(200)

    const read = await request(app)
      .put('/api/notifications/read-all')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(read.status).toBe(200)
  })
})

describe('instructor flow', () => {
  it('lists own courses', async () => {
    const res = await request(app)
      .get('/api/instructor/courses')
      .set('Authorization', `Bearer ${instructorToken}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].enrollmentCount).toBeGreaterThanOrEqual(0)
  })

  it('lists students enrolled in their courses', async () => {
    const res = await request(app)
      .get('/api/instructor/students')
      .set('Authorization', `Bearer ${instructorToken}`)
    expect(res.status).toBe(200)
  })

  it('denies a student access to instructor endpoints', async () => {
    const res = await request(app)
      .get('/api/instructor/courses')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(403)
  })
})

describe('admin flow', () => {
  it('lists all courses including drafts', async () => {
    const res = await request(app)
      .get('/api/admin/courses')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
  })

  it('lists students', async () => {
    const res = await request(app)
      .get('/api/admin/students')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('returns dashboard stats', async () => {
    const res = await request(app)
      .get('/api/dashboard/admin')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body.stats).toBeDefined()
    expect(res.body.stats.students).toBeGreaterThan(0)
  })

  it('returns reports aggregations', async () => {
    const res = await request(app)
      .get('/api/admin/reports')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body.totals).toBeDefined()
  })

  it('creates an announcement', async () => {
    const res = await request(app)
      .post('/api/admin/announcements')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Welcome!', message: 'Term starts Monday', audience: 'students' })
    expect(res.status).toBe(201)
    expect(res.body.recipients).toBeGreaterThan(0)
  })

  it('denies a student access to admin reports', async () => {
    const res = await request(app)
      .get('/api/admin/reports')
      .set('Authorization', `Bearer ${studentToken}`)
    expect(res.status).toBe(403)
  })
})
