
import { motion } from "framer-motion"
import styles from "./ContactPage.module.css"

const ContactPage = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  const cardVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(0, 255, 0, 0.4)",
      transition: { duration: 0.3 },
    },
  }

  const contactInfo = [
    {
      icon: "📍",
      title: "Dirección",
      info: "Carrera 15B #7A-28 Pore, Casanare",
      detail: "Visítanos en nuestras instalaciones",
    },
    {
      icon: "📞",
      title: "Teléfono",
      info: "+57 3219754084",
      detail: "Lun a vie: 08:00 - 18:00",
    },
    {
      icon: "📧",
      title: "Email",
      info: "agromulti@gmail.com",
      detail: "Respuesta en 24hs",
    },
    {
      icon: "🌐",
      title: "Redes Sociales",
      info: "@agromulti ",
      detail: "Síguenos para novedades",
    },
  ]

  const schedule = [
    { day: "Lunes - Viernes", hours: "8:00 - 18:00", status: "Abierto" },
  ]

  const services = [
    { icon: "🌾⚙️", name: "Carga y descarga", description: "Carga y descarga de insumos agricolas y demas" },
    { icon: "🚛", name: "Transporte especializado", description: "Transporte de maquinaria agricola y demas" },
    { icon: "🌾🏡", name: "Asesoramiento logístico", description: "Asesoramiento en logistica para el sector agricola" },
  ]

  return (
    <motion.div className={styles["contact-page"]} variants={containerVariants} initial="initial" animate="animate">

      <motion.section className={styles["contact-hero"]} variants={itemVariants}>
        <div className={styles["hero-content"]}>
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Contáctanos
          </motion.h1>
          <motion.p variants={itemVariants}>
            Estamos aquí para ayudarte. Encuentra toda la información que necesitas para visitarnos.
          </motion.p>
        </div>

        <div className={styles["floating-elements"]}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={styles["floating-element"]}
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
      </motion.section>

      <motion.section className={styles["contact-info-section"]} variants={itemVariants}>
        <h2>Información de Contacto</h2>
        <div className={styles["contact-grid"]}>
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles["contact-card"]}
              variants={cardVariants}
              whileHover="hover"
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles["contact-icon"]}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={styles["contact-main"]}>{item.info}</p>
              <p className={styles["contact-detail"]}>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className={styles["schedule-section"]} variants={itemVariants}>
        <h2>Horarios de Atención</h2>
        <div className={styles["schedule-container"]}>
          {schedule.map((item, index) => (
            <motion.div
              key={item.day}
              className={styles["schedule-item"]}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "#222222" }}
            >
              <div className={styles["schedule-day"]}>{item.day}</div>
              <div className={styles["schedule-hours"]}>{item.hours}</div>
              <div className={`${styles["schedule-status"]} ${styles[item.status.toLowerCase()]}`}>
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className={styles["services-section"]} variants={itemVariants}>
        <h2>Nuestros Servicios</h2>
        <div className={styles["services-grid"]}>
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className={styles["service-card"]}
              variants={cardVariants}
              whileHover="hover"
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles["service-icon"]}>{service.icon}</div>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}

export default ContactPage