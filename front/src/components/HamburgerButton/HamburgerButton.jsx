import { motion } from "framer-motion"
import styles from "./HamburgerButton.module.css"

const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <motion.button className={styles["hamburger-button"]} onClick={onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <div className={styles["hamburger-container"]}>
        <motion.span
          className={styles["hamburger-line"]}
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={styles["hamburger-line"]}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={styles["hamburger-line"]}
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  )
}

export default HamburgerButton