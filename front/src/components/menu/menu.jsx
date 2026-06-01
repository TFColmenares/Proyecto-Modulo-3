import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./Menu.module.css"

const Menu = ({ onClose, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Turnos", path: "/turnos", icon: "📅" },
    { name: "Contacto", path: "/contacto", icon: "📞" },
  ]

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  const handleItemClick = (path) => {
    navigate(path)
    onClose()
  }

  const handleLogout = () => {
    onLogout()
    onClose()
  }

  return (
    <>
      <motion.div
        className={styles["menu-overlay"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className={styles["menu"]}
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <div className={styles["menu-header"]}>
          <h3>Menu</h3>
          <button className={styles["close-button"]} onClick={onClose}>✕</button>
        </div>

        <nav className={styles["menu-nav"]}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <motion.button
                key={item.name}
                className={`${styles["menu-item"]} ${isActive ? styles["active"] : ""}`}
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: index * 0.1 }}
                onClick={() => handleItemClick(item.path)}
                whileHover={{ x: 10, color: "#00ff00" }}
              >
                <span className={styles["menu-icon"]}>{item.icon}</span>
                {item.name}
              </motion.button>
            )
          })}

          <motion.button
            className={styles["logout-button"]}
            variants={itemVariants}
            initial="closed"
            animate="open"
            transition={{ delay: menuItems.length * 0.1 }}
            onClick={handleLogout}
            whileHover={{
              x: 10,
              backgroundColor: "#ff0000",
              borderColor: "#ff0000",
            }}
          >
            🏃 Cerrar Sesión
          </motion.button>
        </nav>
      </motion.div>
    </>
  )
}

export default Menu