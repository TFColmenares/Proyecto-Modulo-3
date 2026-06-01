import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Routes, Route } from "react-router-dom"

import AuthPage from "./view/AuthPage/AuthPage"
import MainApp from "./view/MainApp/MainApp"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (data) => {
    const { token, user } = data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes>
          {!isAuthenticated ? (
            <Route path="/*" element={<AuthPage key="auth" onLogin={handleLogin} />} />
          ) : (
            <Route
              path="/*"
              element={<MainApp key="main" user={user} onLogout={handleLogout} />}
            />
          )}
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
