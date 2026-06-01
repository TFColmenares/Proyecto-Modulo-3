import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios";
import TurnoForm from "../../components/myAppointmentsForm/myAppointmentsForm";
import "./myAppointmentPage.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const Appointment = ({ user }) => {
  const [activeTab, setActiveTab] = useState("todos")
  const [turnos, setTurnos] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchTurnos = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/${user.id}`)
      const turnosFormateados = res.data.appointments.map((t) => ({
        id: t.id,
        fecha: t.date,
        hora: t.time,
        estado: t.status === "active" ? "aceptado" : "cancelado",
        cancha: t.tipo,
      }))
      setTurnos(turnosFormateados)
    } catch (error) {
      console.error("Error al traer los turnos", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) fetchTurnos()
  }, [user])

   const handleCancelTurno = async (id) => {
  try {
    await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
    setTurnos((prevTurnos) =>
      prevTurnos.map((turno) =>
        turno.id === id ? { ...turno, estado: "cancelado" } : turno
      )
    )
  } catch (error) {
    console.error("Error al cancelar el turno:", error)
    alert("Ocurrió un error al cancelar el turno")
  }
}

  const filteredTurnos = turnos.filter((turno) => {
    if (activeTab === "todos") return true
    return turno.estado === activeTab
  })

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
  }

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    hover: {
      scale: 1.02,
      boxShadow: "0 0 25px rgba(0, 255, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  }

  const getStatusColor = (estado) => {
    switch (estado) {
      case "aceptado":
        return "#00ff00"
      case "cancelado":
        return "#ff4444"
      default:
        return "#00cc00"
    }
  }

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "aceptado":
        return "✅"
      case "cancelado":
        return "❌"
      default:
        return "📅"
    }
  }

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case "Carga o descarga de insumos":
        return 
      case "Carga o descarga de productos":
        return 
      default:
        return "🏟️"
    }
  }

  const stats = {
    total: turnos.length,
    aceptados: turnos.filter((t) => t.estado === "aceptado").length,
    cancelados: turnos.filter((t) => t.estado === "cancelado").length,
  }

  if (loading) {
    return (
      <motion.div className="loading-state">
        <h2>Cargando turnos...</h2>
      </motion.div>
    )
  }

  return (
    <motion.div className="turnos-page" variants={containerVariants} initial="initial" animate="animate">

      <motion.section className="turno-form-wrapper" variants={itemVariants}>
        <TurnoForm userId={user.id} onSuccess={fetchTurnos} />
      </motion.section>

      <motion.section className="turnos-hero" variants={itemVariants}>
        <div className="hero-content">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Mis Turnos
          </motion.h1>
        </div>


        <motion.div className="stats-container" variants={itemVariants}>
          <motion.div className="stat-card aceptados" whileHover={{ scale: 1.05 }}>
            <span className="stat-icon">✅</span>
            <h3>{stats.aceptados}</h3>
            <p>Aceptados</p>
          </motion.div>
          <motion.div className="stat-card cancelados" whileHover={{ scale: 1.05 }}>
            <span className="stat-icon">❌</span>
            <h3>{stats.cancelados}</h3>
            <p>Cancelados</p>
          </motion.div>
        </motion.div>
      </motion.section>


      <motion.section className="filter-section" variants={itemVariants}>
        <div className="filter-tabs">
          {["todos", "aceptado", "cancelado"].map((tab) => (
            <motion.button
              key={tab}
              className={`filter-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section className="turnos-list" variants={itemVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="turnos-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTurnos.length === 0 ? (
              <motion.div
                className="no-turnos"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="no-turnos-icon">📅</span>
                <h3>No hay turnos</h3>
                <p>No tienes turnos en esta categoría</p>
              </motion.div>
            ) : (
              filteredTurnos.map((turno, index) => (
                <motion.div
                  key={turno.id}
                  className="turno-card"
                  variants={cardVariants}
                  whileHover="hover"
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="turno-header">
                    <div className="turno-tipo">
                      <span className="tipo-icon">{getTipoIcon(turno.tipo)}</span>
                      <span className="tipo-text">{turno.tipo}</span>
                    </div>
                    <div className="turno-status" style={{ color: getStatusColor(turno.estado) }}>
                      <span className="status-icon">{getStatusIcon(turno.estado)}</span>
                      <span className="status-text">{turno.estado.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="turno-content">
                    <h3 className="cancha-name">{turno.cancha}</h3>
                    <div className="turno-details">
                      <div className="detail-item">
                        <span className="detail-icon">Fecha📅:</span>
                        <span>{turno.fecha}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">Hora⏰:</span>
                        <span>{turno.hora}</span>
                      </div>
                    </div>
                  </div>

                  <div className="turno-actions">
                    {turno.estado === "aceptado" && (
                      <motion.button
                        className="cancel-button"
                        onClick={() => handleCancelTurno(turno.id)}
                        whileHover={{ scale: 1.05, backgroundColor: "#ff4444" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancelar Turno
                      </motion.button>
                    )}
                    {turno.estado === "cancelado" }
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

    </motion.div>
  )
}

export default Appointment
