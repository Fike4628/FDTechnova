/**
 * notificationController — in-app notifications for the signed-in user.
 * Every list/mutate is scoped to req.user.id so users can't read others' data.
 */
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Notification } = require('../models')

const listNotifications = asyncHandler(async (req, res) => {
  const { unread } = req.query
  const where = { userId: req.user.id }
  if (unread === 'true') where.isRead = false

  const notifications = await Notification.findAll({
    where,
    order: [['created_at', 'DESC']],
  })
  res.json(notifications)
})

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    where: { id: req.params.id, userId: req.user.id },
  })
  if (!notification) throw ApiError.notFound('Notification not found')

  notification.isRead = true
  await notification.save()
  res.json(notification)
})

const markAllAsRead = asyncHandler(async (req, res) => {
  const [count] = await Notification.update(
    { isRead: true },
    { where: { userId: req.user.id, isRead: false } }
  )
  res.json({ message: 'All notifications marked as read', count })
})

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    where: { id: req.params.id, userId: req.user.id },
  })
  if (!notification) throw ApiError.notFound('Notification not found')
  await notification.destroy()
  res.json({ message: 'Notification deleted' })
})

/**
 * Announcements — admin broadcasts stored as notifications of type
 * "announcement" delivered to every student (or every user if `audience` is
 * "all"). No dedicated model is needed; they're a filtered Notification view.
 */
const { User } = require('../models')

const listAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Notification.findAll({
    where: { type: 'announcement' },
    order: [['created_at', 'DESC']],
  })
  res.json(announcements)
})

const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, message, audience = 'students' } = req.body
  if (!title) throw ApiError.badRequest('Announcement title is required')

  const roleWhere = audience === 'all' ? {} : { role: 'student' }
  const recipients = await User.findAll({
    where: roleWhere,
    attributes: ['id'],
  })

  const rows = recipients.map((u) => ({
    userId: u.id,
    title,
    message,
    type: 'announcement',
    isRead: false,
  }))

  await Notification.bulkCreate(rows)

  res.status(201).json({
    message: `Announcement delivered to ${recipients.length} ${audience}`,
    recipients: recipients.length,
  })
})

module.exports = {
  listNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  listAnnouncements,
  createAnnouncement,
}
