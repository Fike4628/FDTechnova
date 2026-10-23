/**
 * LearningMaterial — a downloadable/attached file for a lesson.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const LearningMaterial = sequelize.define(
  'LearningMaterial',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'lesson_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'file_url',
    },
    fileType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'file_type',
      comment: 'Mime type, e.g. application/pdf',
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'file_size',
      comment: 'Bytes',
    },
  },
  {
    tableName: 'learning_materials',
  }
)

module.exports = LearningMaterial
