import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import HamburgerButton from "../HamburgerButton/HamburgerButton"
import Menu from "../Menu/Menu"
import styles from "./Navbar.module.css"

const Navbar = ({ onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles["navbar-container"]}>
          <div
            className={styles["navbar-logo"]}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <h2>🏞️ Agromulti</h2>
          </div>

          <div className={styles["navbar-user"]}>
            <span className={styles["user-info"]}>
              {user?.avatar} {user?.name}
            </span>
            <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onLogout={onLogout}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar