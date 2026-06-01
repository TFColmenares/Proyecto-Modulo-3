import { useLocation, useNavigate, Routes, Route } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "../../components/Navbar/Navbar"
import HomePage from "../HomePage/HomePage"
import ContactPage from "../ContactPage/ContactPage"
import AppointmentPage from "../MyAppointmentPage/myAppointmentPage"
import styles from "./MainApp.module.css"

const MainApp = ({ user, onLogout }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleNavigation = (path) => {
    navigate(path)
  }

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <motion.div
      className={styles["main-app"]}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        user={user}
        onLogout={onLogout}
        onNavigate={handleNavigation}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                className={styles["page-container"]}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <HomePage user={user} onNavigate={handleNavigation} />
              </motion.div>
            }
          />
          <Route
            path="/contacto"
            element={
              <motion.div
                className={styles["page-container"]}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ContactPage />
              </motion.div>
            }
          />
          <Route
            path="/turnos"
            element={
              <motion.div
                className={styles["page-container"]}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <AppointmentPage user={user} />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </motion.div>
  )
}

export default MainApp