/**
 * Payment — a transaction for an enrollment. Tied to a student and optionally
 * the enrollment it covers. The payment provider (mock/real) is abstracted
 * away in services/paymentService.js.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const STATUSES = ['pending', 'completed', 'failed', 'refunded']
const METHODS = ['card', 'bank_transfer', 'cash', 'mobile_money', 'other']

const Payment = sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enrollmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'enrollment_id',
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'student_id',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: { args: [STATUSES], msg: 'Invalid payment status' },
      },
    },
    method: {
      type: DataTypes.ENUM(...METHODS),
      allowNull: true,
      validate: {
        isIn: { args: [METHODS], msg: 'Invalid payment method' },
      },
    },
    transactionId: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: 'transaction_id',
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'paid_at',
    },
  },
  {
    tableName: 'payments',
  }
)

Payment.STATUSES = STATUSES
Payment.METHODS = METHODS

module.exports = Payment
