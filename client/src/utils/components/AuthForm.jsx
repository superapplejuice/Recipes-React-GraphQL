import React, { useState } from 'react'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const AuthForm = ({
  initialValues,
  validationSchema,
  mutation,
  location,
  formTitle,
  successMessage,
  children
}) => {
  const [formValues, setFormValues] = useState({})
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(false)

  const { username, email, password } = formValues

  const setVariables = () => {
    const { pathname } = location
    return pathname === '/auth/register'
      ? { username, email, password }
      : { email, password }
  }

  return (
    <div>
      <div>{formTitle}</div>
      <Mutation mutation={mutation} variables={setVariables()}>
        {(mutationFunction, { loading }) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setErrors(null)
                setFormValues(values)

                const { data } = await mutationFunction()
                console.log(data)

                resetForm(initialValues)
                setSuccess(true)
                setSubmitting(false)
              } catch (err) {
                setSuccess(false)
                const errMessage = err.toString().slice(22)

                setErrors(errMessage)
                setSubmitting(false)
              }
            }}
          >
            {({ handleSubmit, isSubmitting, handleReset }) => (
              <form onSubmit={handleSubmit}>
                {children}
                <div>
                  <button type='submit' disabled={isSubmitting}>
                    Submit
                  </button>
                  <button type='reset' onClick={handleReset}>
                    Clear fields
                  </button>
                </div>
                <div>
                  {loading && <p>Submitting...</p>}
                  {errors && <p>{errors}</p>}
                  {success && <p>{successMessage}</p>}
                </div>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </div>
  )
}

export default withRouter(AuthForm)
