/**
 * InstructorProfile — 1:1 extension of User for instructor-specific data.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const InstructorProfile = sequelize.define(
  'InstructorProfile',
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    expertise: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'years_of_experience',
      validate: { min: 0 },
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'instructor_profiles',
  }
)

module.exports = InstructorProfile
