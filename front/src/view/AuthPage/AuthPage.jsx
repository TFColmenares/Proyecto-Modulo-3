import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "../../components/LoginForm/LoginForm"
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import "./AuthPage.css"

const AuthPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("login")

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  }

  const leftVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  }

  const rightVariants = {
    initial: { x: 100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  }

  const itemVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      className="auth-page-style"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      
      <div className="auth-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="shape"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="auth-container">
        <motion.div className="auth-info-section" variants={leftVariants}>
          <motion.div className="brand-section" variants={itemVariants}>
            <motion.h1
              className="brand-title"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 255, 0, 0.5)",
                  "0 0 40px rgba(0, 255, 0, 0.8)",
                  "0 0 20px rgba(0, 255, 0, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
               Agromulti
            </motion.h1>
            <motion.p className="brand-tagline" variants={itemVariants}>
              Los mejores servicios para la carga y descarga de productos agrícolas
            </motion.p>
          </motion.div>

          <motion.div className="description-section" variants={itemVariants}>
            <h2>Donde tus necesidades son nuestra preocupacion</h2>
            <p>
              Unete a nuestra comunidad y experimenta la diferencia de
              Agromulti: calidad, confianza y servicio excepcionales para cargar
              y descargar tus productos agricolas.
            </p>
          </motion.div>

          <motion.div className="benefits-section" variants={itemVariants}>
            <div className="benefit-item">
              <span className="benefit-icon">🏟️</span>
              <div className="benefit-text">
                <h3>2 Excepcionales servicios</h3>
                <p>Carga y descarga de diferentes productos agricolas</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        
        <motion.div className="auth-form-section" variants={rightVariants}>
          <div className="form-container">
            <motion.div className="form-header" variants={itemVariants}>
              <h2>Accede a tu cuenta</h2>
              <p>Inicia sesión o regístrate para reservar nuestros servicios</p>
            </motion.div>

            <motion.div className="form-tabs" variants={itemVariants}>
              <motion.button
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Iniciar Sesión
              </motion.button>
              <motion.button
                className={`tab ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Registrarse
              </motion.button>
            </motion.div>

            <motion.div className="form-content" variants={itemVariants}>
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <LoginForm key="login" onLogin={onLogin} />
                ) : (
                  <RegisterForm key="register" onLogin={onLogin} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AuthPage
