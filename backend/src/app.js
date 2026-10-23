/**
 * app.js — Express application assembly.
 *
 * Order matters: security headers -> CORS -> body parsers -> logging -> rate
 * limit -> routes -> static files -> 404 -> error handler (always last).
 *
 * All API routes live under `/api` to match the frontend's VITE_API_BASE_URL.
 * Admin-scoped resource routers are mounted at `/api/admin/<resource>`.
 */
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const config = require('./config/env')
const corsOptions = require('./config/cors')
const { genericLimiter } = require('./middleware/rateLimiter')
const { notFound, errorHandler } = require('./middleware/errorHandler')

// Routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const assignmentRoutes = require('./routes/assignmentRoutes')
const quizRoutes = require('./routes/quizRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express()

// Trust the first proxy hop so rate-limiter reads the real client IP behind
// nginx/elastic load balancers. Harmless in direct dev usage.
app.set('trust proxy', 1)

// ── Security & plumbing ───────────────────────────────
app.use(helmet())
app.use(corsOptions ? require('cors')(corsOptions) : require('cors')())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan(config.isProduction ? 'combined' : 'dev', {
    skip: () => config.isTest,
  })
)

// Static file serving for uploaded assets (/uploads/<file>).
app.use('/uploads', express.static(path.resolve(process.cwd(), config.upload.dir)))

// ── Rate limiting ─────────────────────────────────────
app.use('/api', genericLimiter)

// ── Health check ──────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'fdteknova-academy-backend',
    time: new Date().toISOString(),
  })
})

// ── Resource routes (mounted before the aggregator) ──
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/admin/categories', categoryRoutes.adminRouter)
app.use('/api/courses', courseRoutes)
app.use('/api/admin/courses', courseRoutes.adminRouter)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/admin/enrollments', enrollmentRoutes.adminRouter)
app.use('/api/lessons', lessonRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/admin/schedules', scheduleRoutes.adminRouter)
app.use('/api/notifications', notificationRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin/payments', paymentRoutes.adminRouter)

// ── Role-scoped aggregator (/student, /instructor, /dashboard, /admin/*) ──
app.use('/api', dashboardRoutes)

// ── 404 + error handling (must be last) ───────────────
app.use(notFound)
app.use(errorHandler)

module.exports = app
