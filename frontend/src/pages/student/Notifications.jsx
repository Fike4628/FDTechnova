import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { notificationService } from '../../services/notificationService'
import { formatDate } from '../../utils/formatDate'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    notificationService.getAll().then(setNotifications).finally(() => setLoading(false))
  }, [])

  const markRead = async (id) => {
    await notificationService.markAsRead(id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up!" />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-xl p-4 flex items-start justify-between gap-4 transition ${
                n.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div>
                <p className={`text-sm ${n.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(n.createdAt)}</p>
              </div>
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="text-xs text-blue-600 hover:underline shrink-0"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications
