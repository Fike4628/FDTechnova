/**
 * Module — a grouping of lessons within a course. Ordered by `order`.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Module = sequelize.define(
  'Module',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'course_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 0 },
    },
  },
  {
    tableName: 'modules',
  }
)

module.exports = Module
