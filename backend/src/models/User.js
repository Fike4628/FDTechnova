/**
 * User — the account record shared by all roles.
 *
 * `role` gates access via the `authorize` middleware. Passwords are hashed
 * with bcryptjs before persistence; the model never returns the hash in
 * queries (see the `exclude` option used by authenticate and controllers).
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const bcrypt = require('bcryptjs')
const config = require('../config/env')

const ROLES = ['student', 'instructor', 'admin']

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'first_name',
      validate: { notEmpty: true },
    },
    lastName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'last_name',
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: { msg: 'Email is already registered' },
      validate: { isEmail: { msg: 'A valid email is required' } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [8, 128], msg: 'Password must be at least 8 characters' },
      },
    },
    role: {
      type: DataTypes.ENUM(...ROLES),
      allowNull: false,
      defaultValue: 'student',
      validate: {
        isIn: { args: [ROLES], msg: 'Invalid role' },
      },
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_at',
    },
  },
  {
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: [] }, // include password for login checks
      },
    },
    hooks: {
      // Hash only when the password changed (sequelize-level change tracking).
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(config.bcrypt.rounds)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
    },
  }
)

/**
 * Verify a plaintext password against the stored hash.
 */
User.prototype.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

/**
 * Convenience: full display name.
 */
User.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`
}

module.exports = User
module.exports.ROLES = ROLES
