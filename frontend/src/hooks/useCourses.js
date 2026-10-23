import { useEffect, useState } from 'react'
import { courseService } from '../services/courseService'

/**
 * Hook to fetch courses with optional filters.
 * @param {object} params - filter params: { featured, limit, search, category, level, price, page }
 */
export function useCourses(params = {}) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    courseService
      .getAll(params)
      .then((data) => {
        if (cancelled) return
        // API may return { courses, totalPages } or a plain array
        if (Array.isArray(data)) {
          setCourses(data)
          setTotalPages(1)
        } else {
          setCourses(data.courses ?? [])
          setTotalPages(data.totalPages ?? 1)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
    // Serialize params to avoid infinite re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  return { courses, loading, totalPages, error }
}
