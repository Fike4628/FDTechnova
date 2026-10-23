import React, { createContext, useCallback, useEffect, useState } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  const value = { user, setUser, loading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
