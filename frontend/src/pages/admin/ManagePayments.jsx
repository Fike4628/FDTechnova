import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'
import { formatCurrency } from '../../utils/formatCurrency'

function ManagePayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getPayments().then(setPayments).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
      <p className="text-gray-500 text-sm mb-6">Total Revenue: <strong className="text-gray-900">{formatCurrency(total)}</strong></p>

      {payments.length === 0 ? (
        <EmptyState title="No payments yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-800">{p.studentName}</td>
                  <td className="px-4 py-3 text-gray-700">{p.courseName}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(p.paidAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManagePayments
