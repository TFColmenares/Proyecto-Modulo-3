import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./RegisterForm.module.css"
import { useUser } from "../../context/UserContext"



const RegisterForm = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: null,
    nDni: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("⚠️ Completá con tu nombre"),
    email: Yup.string().email("Email inválido").required("⚠️ Email requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "⚠️ Las contraseñas no coinciden")
      .required("⚠️ Confirmá la contraseña"),
    nDni: Yup.string().required("⚠️ Completá con tu DNI "),
    birthdate: Yup.date()
      .nullable()
      .required("⚠️ Fecha de nacimiento requerida")
      .test(
        "age",
        "⚠️ Debés tener al menos 13 años",
        value => {
          if (!value) return false
          const today = new Date()
          const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
          return value <= thirteenYearsAgo
        }
      ),
  })
   const { registerUser, loginUser } = useUser()

  const handleSubmit = async (values, { setSubmitting }) => {
  setIsLoading(true)
  try {
    const userData = {
      username: values.email,
      password: values.password,
      name: values.name,
      email: values.email,
      birthdate: values.birthdate,
      nDni: values.nDni,
    }

    await registerUser(userData)

    const loginRes = await loginUser({
      username: values.email,
      password: values.password,
    })

    toast.success("✅ Registrado y logueado correctamente")
    onLogin(loginRes)
  } catch (err) {
    toast.error("❌ Error: " + (err.response?.data?.message || err.message))
  } finally {
    setIsLoading(false)
    setSubmitting(false)
  }
}

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange={true}   
      validateOnBlur={false}    
    >
      {({ values, setFieldValue,setTouched, isSubmitting, isValid, dirty }) => (
        <motion.div
          className={styles["register-form"]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Form>
            <div className={styles["form-group"]}>
              <label htmlFor="name">Nombre completo</label>
              <Field name="name" type="text" disabled={isLoading} />
              <ErrorMessage name="name" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" disabled={isLoading} />
              <ErrorMessage name="email" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="birthdate">Fecha de nacimiento</label>
              <DatePicker
                selected={values.birthdate}
                onChange={date => {
                  setFieldValue("birthdate", date)
                  setTouched({ birthdate: true })
                }}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                disabled={isLoading}
                placeholderText="Seleccioná tu fecha"
                className={styles["datepicker"]}
              />
              <ErrorMessage name="birthdate" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="nDni">DNI</label>
              <Field name="nDni" type="text" disabled={isLoading} />
              <ErrorMessage name="nDni" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" disabled={isLoading} />
              <ErrorMessage name="password" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <Field name="confirmPassword" type="password" disabled={isLoading} />
              <ErrorMessage name="confirmPassword" component="div" className={styles["error"]} />
            </div>

            {isValid && dirty && (
              <motion.button
                type="submit"
                className={styles["submit-button"]}
                disabled={isSubmitting || isLoading}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isLoading ? "Registrando..." : "Registrarse"}
              </motion.button>
            )}
          </Form>

          <ToastContainer position="top-right" autoClose={4000} />
        </motion.div>
      )}
    </Formik>
  )
}

export default RegisterForm