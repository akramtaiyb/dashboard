import React, { createContext, useState, useEffect } from 'react'
import axios from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error) {
      console.error('Login error', error)
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      console.error('Logout error', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Optionally, you could verify the token and fetch the user data here
      setUser({}) // Set the user state appropriately
    }
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)
