import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import styles from "./LoginForm.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "../../context/UserContext" 

const LoginForm = ({ onLogin }) => {
  const { loginUser } = useUser() 

  const initialValues = { username: "", password: "" }

  const validationSchema = Yup.object({
    username: Yup.string().email("Email inválido").required("⚠️ completa el campo "),
    password: Yup.string().required("⚠️ completa el campo"),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const loginRes = await loginUser({
        username: values.username,
        password: values.password,
      })

      toast.success("✅ Sesión iniciada correctamente")
      onLogin(loginRes) 

    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || err.message))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
      validateOnBlur={false}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <motion.div
          className={styles["login-form"]}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Form>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <Field name="username" type="email" disabled={isSubmitting} />
              <ErrorMessage name="username" component="div" className={styles["error"]} />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" disabled={isSubmitting} />
              <ErrorMessage name="password" component="div" className={styles["error"]} />
            </div>

            {isValid && dirty && (
              <motion.button
                type="submit"
                className={styles["submit-button"]}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? "Cargando..." : "Iniciar sesión"}
              </motion.button>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
          </Form>
        </motion.div>
      )}
    </Formik>
  )
}

export default LoginForm