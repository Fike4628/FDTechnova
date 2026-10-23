/**
 * StudentProfile — 1:1 extension of User for student-specific data.
 * Kept separate so a student account and instructor account share one
 * User table but carry role-specific attributes.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const StudentProfile = sequelize.define(
  'StudentProfile',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'user_id',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth',
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'student_profiles',
  }
)

module.exports = StudentProfile
