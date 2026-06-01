import { motion } from "framer-motion"
import styles from "./HomePage.module.css"

const HomePage = ({ user, onNavigate }) => {
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

  return (
    <motion.div className={styles["home-page"]} variants={containerVariants} initial="initial" animate="animate">
      <motion.section className={styles["hero-section"]} variants={itemVariants}>
        <div className={styles["hero-content"]}>
          <motion.div
            className={styles["user-welcome"]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <span className={styles["user-avatar"]}>{user?.avatar || "🏞️"}</span>
            <h1>¡Bienvenido, {user?.name || "Usuario"}!</h1>
          </motion.div>
        </div>

       <motion.section className={styles["description-section"]} variants={itemVariants}>
        <div className={styles["description-content"]}>
          <h2>¿Por qué elegir Agromulti?</h2>
          <p>
            En Agromulti, nos dedicamos a ofrecer servicios de carga y descarga de paddy e insumos agrícolas con la máxima eficiencia y cuidado. Nuestro equipo experimentado y comprometido garantiza que cada operación se realice de manera segura y puntual, protegiendo la calidad de sus productos. Con tecnología avanzada y un enfoque centrado en el cliente, nos esforzamos por superar sus expectativas en cada servicio.
          </p>
        </div>
      </motion.section>
      <motion.section className={styles["quick-actions"]} variants={itemVariants}>
         <h2> Acciones Rapidas</h2>
        <div className={styles["actions-container"]}>
          <motion.button
            className={styles["quick-action"]}
            onClick={() => onNavigate("contacto")}
            whileHover={{ scale: 1.05, backgroundColor: "#00ff00", color: "#000" }}
            whileTap={{ scale: 0.95 }}
          >
            📞 Contactar
          </motion.button>
           <motion.button
            className={styles["quick-action"]}
            onClick={() => onNavigate("turnos")}
            whileHover={{ scale: 1.05, backgroundColor: "#00ff88", color: "#000" }}
            whileTap={{ scale: 0.95 }}
          >
            📅 Reservar Ahora
          </motion.button>
        </div>
      </motion.section>
       <motion.section className={styles["courts-section"]} variants={itemVariants}>
        <h2>Nuestras servicios</h2>
        <div className={styles["courts-container"]}>
          {[
            {
              nombre: "Carga y descarga de paddy",
              imagen: "/public/img/WhatsApp Image 2025-11-13 at 2.58.22 AM.jpeg",
              descripcion: "Servicio eficiente de carga y descarga de paddy, garantizando la integridad del producto durante todo el proceso.",
            },
            {
              nombre: "Carga y descarga de insumos agrícolas",
              imagen: "/public/img/WhatsApp Image 2025-11-13 at 2.58.21 AM.jpeg",
              descripcion: "Manejo cuidadoso y seguro de insumos agrícolas, asegurando una entrega puntual y en óptimas condiciones.",
            },
          ].map((cancha, index) => (
            <motion.div
              key={index}
              className={styles["court-card"]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={cancha.imagen} alt={cancha.nombre} className={styles["court-image"]} />
              <h3>{cancha.nombre}</h3>
              <p>{cancha.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
        <div className={styles["floating-elements"]}>
          {[...Array(8)].map((_, i) => (
             <motion.div
            key={i}
            className={styles["floating-element"]}
            animate={{
              y: [0, 20, 0],
              x: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i ,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
          ))}
        </div>
      </motion.section>

    </motion.div>
  )
}

export default HomePage