/**
 * 001-demo-data — seeds an admin, an instructor (with profile), a student,
 * two categories, three courses with lessons, and one enrollment so the API
 * returns data immediately after `npm run db:seed`.
 *
 * Passwords are hashed through the User model's beforeSave hook, so this seed
 * must create records via the model layer (not raw queryInterface bulkInsert).
 */
const { User, StudentProfile, InstructorProfile, Category, Course, Lesson, Enrollment } = require('../src/models')

const DEMO_PASSWORD = 'Password123!'

async function up() {
  // ── Users ────────────────────────────────────────────
  const admin = await User.create({
    firstName: 'Site',
    lastName: 'Admin',
    email: 'admin@fdteknova.test',
    password: DEMO_PASSWORD,
    role: 'admin',
  })

  const instructor = await User.create({
    firstName: 'Jane',
    lastName: 'Mensah',
    email: 'instructor@fdteknova.test',
    password: DEMO_PASSWORD,
    role: 'instructor',
  })
  await InstructorProfile.create({
    userId: instructor.id,
    title: 'Senior Graphic Designer',
    bio: '10+ years teaching design fundamentals.',
    expertise: ['Graphic Design', 'Branding'],
    yearsOfExperience: 10,
  })

  const student = await User.create({
    firstName: 'Kwame',
    lastName: 'Owusu',
    email: 'student@fdteknova.test',
    password: DEMO_PASSWORD,
    role: 'student',
  })
  await StudentProfile.create({ userId: student.id, education: 'High School' })

  // ── Categories ───────────────────────────────────────
  const design = await Category.create({ name: 'Graphic Design', slug: 'graphic-design' })
  const web = await Category.create({ name: 'Web Design', slug: 'web-design' })

  // ── Courses ──────────────────────────────────────────
  const course1 = await Course.create({
    title: 'Graphic Design Fundamentals',
    slug: 'graphic-design-fundamentals',
    shortDescription: 'Master the core principles of visual design.',
    description: 'A complete introduction to colour, typography and layout.',
    price: 49.0,
    level: 'beginner',
    status: 'published',
    featured: true,
    imageUrl: '/images/courses/graphic_design.png',
    instructorId: instructor.id,
    categoryId: design.id,
    durationHours: 12,
  })

  const course2 = await Course.create({
    title: 'Modern Web Design',
    slug: 'modern-web-design',
    shortDescription: 'Build responsive, accessible websites.',
    description: 'Learn HTML, CSS and responsive design from the ground up.',
    price: 0,
    level: 'beginner',
    status: 'published',
    featured: false,
    imageUrl: '/images/courses/web_design.png',
    instructorId: instructor.id,
    categoryId: web.id,
    durationHours: 16,
  })

  // ── Lessons ──────────────────────────────────────────
  await Lesson.bulkCreate([
    { courseId: course1.id, title: 'Introduction to Design', content: 'What is graphic design?', order: 1, isPreview: true, duration: 15 },
    { courseId: course1.id, title: 'Colour Theory', content: 'The colour wheel and palettes.', order: 2, isPreview: false, duration: 30 },
    { courseId: course1.id, title: 'Typography Basics', content: 'Typefaces, hierarchy and pairing.', order: 3, isPreview: false, duration: 25 },
    { courseId: course2.id, title: 'HTML Foundations', content: 'Semantic markup.', order: 1, isPreview: true, duration: 20 },
    { courseId: course2.id, title: 'CSS & Layouts', content: 'Flexbox and grid.', order: 2, isPreview: false, duration: 40 },
  ])

  // ── Enrollment ───────────────────────────────────────
  await Enrollment.create({ studentId: student.id, courseId: course1.id, status: 'active', progress: 33 })

  // eslint-disable-next-line no-console
  console.log('[seed] Demo data created. Logins: admin/instructor/student @ fdteknova.test /', DEMO_PASSWORD)
}

async function down() {
  await Enrollment.destroy({ where: {}, truncate: { cascade: true } })
  await Lesson.destroy({ where: {}, truncate: { cascade: true } })
  await Course.destroy({ where: {}, truncate: { cascade: true } })
  await Category.destroy({ where: {}, truncate: { cascade: true } })
  await StudentProfile.destroy({ where: {}, truncate: { cascade: true } })
  await InstructorProfile.destroy({ where: {}, truncate: { cascade: true } })
  await User.destroy({ where: {}, truncate: { cascade: true } })
}

module.exports = { up, down }
