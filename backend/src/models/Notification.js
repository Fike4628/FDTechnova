/**
 * Notification — an in-app message for a user (read/unread, typed).
 * `relatedType`/`relatedId` let the frontend deep-link to the source entity.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const TYPES = [
  'enrollment',
  'assignment',
  'grade',
  'announcement',
  'schedule',
  'payment',
  'system',
]

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...TYPES),
      allowNull: false,
      defaultValue: 'system',
      validate: {
        isIn: { args: [TYPES], msg: 'Invalid notification type' },
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_read',
    },
    relatedType: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'related_type',
    },
    relatedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'related_id',
    },
  },
  {
    tableName: 'notifications',
    indexes: [{ fields: ['user_id', 'is_read'] }],
  }
)

Notification.TYPES = TYPES

module.exports = Notification
