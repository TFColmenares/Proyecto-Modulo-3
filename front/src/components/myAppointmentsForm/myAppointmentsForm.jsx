import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import axios from "axios"
import { startOfToday } from "date-fns"
import "./myAppointmentsForm.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const TurnoForm = ({ userId, onSuccess }) => {
  const initialValues = {
    tipo: "",
    fecha: "",
    hora: "",
  }

  const tipoOpciones = ["Carga o descarga de insumos", "Carga o descarga de productos", ]

  const validationSchema = Yup.object({
  tipo: Yup.string()
    .oneOf(tipoOpciones, "Tipo no válido")
    .required("⚠️ completa el campo"),
  fecha: Yup.date()
  .min(startOfToday(), "Debe ser una fecha futura")
  .test(
    "es-dia-habil","Solo se permiten fechas de lunes a viernes",
    (value) => {
      if (!value) return false
      const day = new Date(value).getDay()
      return day >= 1 && day <= 5 
    }
  )
  .required("⚠️ completa el campo"),
  hora: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:mm)")
    .test("horario-valido", "La hora debe estar entre las 8:00 y las 18:00", (value) => {
      if (!value) return false
      const [hora] = value.split(":").map(Number)
      return hora >= 8 && hora <= 18
    })
    .required("⚠️ completa el campo"),
})

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      await axios.post(`${API_URL}/appointments/schedule`, {
        userId,
        tipo: values.tipo,
        date: values.fecha,
        time: values.hora,
        status: "active",
      })
      resetForm()
      setStatus({ success: "Turno reservado con éxito." })
      onSuccess && onSuccess()
    } catch (error) {
      console.error("Error al reservar el turno:", error)
      setStatus({ error: "Ocurrió un error al reservar el turno. Intenta nuevamente." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      className="turno-form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="turno1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Reservar turno
      </motion.h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="turno-form">

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label htmlFor="tipo">Tipo de servicio</label>
              <Field as="select" id="tipo" name="tipo">
                <option value="">Selecciona una opción</option>
                {tipoOpciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="tipo" component="div" className="error" />
            </motion.div>


            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label htmlFor="fecha">Fecha</label>
              <Field type="date" id="fecha" name="fecha" />
              <ErrorMessage name="fecha" component="div" className="error" />
            </motion.div>


            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label htmlFor="hora">Hora</label>
              <Field type="time" id="hora" name="hora" />
              <ErrorMessage name="hora" component="div" className="error" />
            </motion.div>


            {status?.success && <div className="success">{status.success}</div>}
            {status?.error && <div className="error">{status.error}</div>}


            <motion.button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05, backgroundColor: "#00ff0", color: "#000" }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Enviando..." : "Reservar Turno"}
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}

export default TurnoForm
