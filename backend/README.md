# FDTeknova Academy — Backend API

REST API for the FDTeknova Academy LMS, built with **Express**, **Sequelize**
and **PostgreSQL**. Provides JWT authentication, role-based access control
(student / instructor / admin), and the endpoints consumed by the frontend in
`../frontend/src/services`.

## Tech stack

- **Express 4** — HTTP layer
- **Sequelize 6** (PostgreSQL) — ORM + migrations/seeders via `sequelize-cli`
- **jsonwebtoken + bcryptjs** — auth
- **express-validator** — request validation
- **helmet / cors / express-rate-limit / morgan** — security & observability
- **multer** — file uploads
- **nodemailer** — transactional email (best-effort in dev)

## Project structure

```
backend/
├── src/
│   ├── config/        # env, db connection, cors, sequelize-cli config
│   ├── models/        # 17 Sequelize models + associations (index.js)
│   ├── controllers/   # request handlers (one per resource)
│   ├── services/      # auth, email, upload, payment business logic
│   ├── routes/        # express routers (public + admin sub-routers)
│   ├── middleware/    # authenticate, authorize, validateRequest, error, rate
│   ├── validators/    # express-validator schemas
│   └── utils/         # ApiError, asyncHandler, slugify
│   ├── app.js         # middleware + route assembly
│   └── server.js      # db connect + listen
├── migrations/        # sequelize-cli migrations
├── seeders/           # demo data seed
├── tests/
├── uploads/           # runtime file storage (gitignored)
└── .sequelizerc       # sequelize-cli paths
```

## Getting started

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# edit DB_* and JWT_SECRET at minimum
```

### 3. Database

You need a running PostgreSQL instance. Create the database:

```bash
createdb fdteknova_academy   # or via psql / your tool of choice
```

Two ways to create tables:

- **Dev convenience** — let Sequelize sync models on boot:
  ```bash
  DB_SYNC=true npm run dev
  ```
- **Migrations (recommended for production)** — generate and run:
  ```bash
  npx sequelize-cli migration:generate --name init
  npm run db:migrate
  ```

Then seed demo data:

```bash
npm run db:seed
```

### 4. Run

```bash
npm run dev     # nodemon, http://localhost:8000
npm start        # production
```

Health check: `GET http://localhost:8000/api/health`

## Demo accounts (after seeding)

| Role        | Email                    | Password        |
| ----------- | ------------------------ | --------------- |
| Admin       | admin@fdteknova.test     | `Password123!`  |
| Instructor  | instructor@fdteknova.test | `Password123!` |
| Student     | student@fdteknova.test   | `Password123!`  |

## API surface

All routes are prefixed with `/api`. The frontend (`VITE_API_BASE_URL`)
points here.

### Auth (`/auth`)
- `POST /auth/register`, `POST /auth/login`
- `POST /auth/forgot-password`, `POST /auth/reset-password`
- `GET /auth/me`

### Public catalog (`/courses`, `/categories`, `/instructors`)
- `GET /courses?featured&search&category&level&price&page&limit`
- `GET /courses/:id` (accepts id or slug)
- `GET /courses/:courseId/lessons` (preview-gated)
- `POST /courses/:id/enroll` (student)
- `GET /categories`, `GET /instructors`

### Role-scoped (`/student`, `/instructor`, `/dashboard`)
- Student: `/student/courses`, `/student/assignments`, `/student/results`,
  `/student/schedule`, `/student/profile`
- Instructor: `/instructor/courses`, `/instructor/assignments`,
  `/instructor/students`, `/instructor/assignments/:id/grade`, `/instructor/profile`
- Dashboards: `/dashboard/admin`, `/dashboard/instructor`, `/dashboard/student`

### Admin (`/admin/*`)
- `/admin/courses` (CRUD), `/admin/categories` (CRUD)
- `/admin/enrollments`, `/admin/schedules`, `/admin/payments`
- `/admin/students`, `/admin/instructors`, `/admin/users/:id/deactivate`
- `/admin/announcements` (broadcast notifications), `/admin/reports` (charts)

### Resources (`/enrollments`, `/lessons`, `/assignments`, `/quizzes`,
`/schedules`, `/notifications`, `/payments`)
Standard CRUD where applicable; see each router in `src/routes/`.

## Auth

JWT bearer tokens. `authenticate` verifies the header and loads `req.user`;
`authorize('admin', ...)` gates roles. Token payload: `{ sub, role }`. The
frontend attaches the token automatically via its axios interceptor.

## Scripts

| Script | Purpose |
| ------ | ------- |
| `npm run dev` | nodemon dev server |
| `npm start` | production server |
| `npm run lint` | eslint |
| `npm test` | jest |
| `npm run db:migrate` | run migrations |
| `npm run db:seed` | seed demo data |
| `npm run db:reset` | undo + migrate + seed |

## Notes

- Email sending is a no-op in dev (logged to console) unless `SMTP_*` is set.
- The payment provider defaults to `mock` — charges always succeed. Swap
  `services/paymentService.js` for a real gateway.
- Password reset uses a short-lived signed JWT (`purpose: "reset"`); no extra
  DB columns are required.
