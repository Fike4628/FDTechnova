/**
 * Category — a course grouping (e.g. "Web Design", "English Language").
 * `slug` is unique for stable URLs.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: 'Category name already exists' },
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'categories',
  }
)

module.exports = Category
