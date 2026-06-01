import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const UsersContext = createContext()
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const registerUser = async (userData) => {
    await axios.post(`${API_URL}/users/register`, userData)
  }

  const loginUser = async (credentials) => {
    const res = await axios.post(`${API_URL}/users/login`, credentials)
    setUser(res.data.user)
    localStorage.setItem("user", JSON.stringify(res.data.user))
    return res.data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <UsersContext.Provider value={{ user, registerUser, loginUser, logout }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUser = () => useContext(UsersContext)