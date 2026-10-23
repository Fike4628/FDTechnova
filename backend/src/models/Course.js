/**
 * Course — the central LMS entity.
 *
 * Owned by an instructor (User) and grouped by a Category. Has many modules,
 * lessons, assignments, schedules and enrollments. The `status` field lets
 * admins keep a course as a draft until ready to publish.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const LEVELS = ['beginner', 'intermediate', 'advanced']
const STATUSES = ['draft', 'published', 'archived']

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: 'short_description',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    level: {
      type: DataTypes.ENUM(...LEVELS),
      allowNull: false,
      defaultValue: 'beginner',
      validate: {
        isIn: { args: [LEVELS], msg: 'Invalid level' },
      },
    },
    language: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: 'English',
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'image_url',
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'draft',
      validate: {
        isIn: { args: [STATUSES], msg: 'Invalid status' },
      },
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'instructor_id',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
    },
    durationHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'duration_hours',
      validate: { min: 0 },
    },
  },
  {
    tableName: 'courses',
    scopes: {
      published: { where: { status: 'published' } },
      featured: { where: { featured: true, status: 'published' } },
    },
  }
)

Course.LEVELS = LEVELS
Course.STATUSES = STATUSES

module.exports = Course
