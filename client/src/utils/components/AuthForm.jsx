import React, { useState } from 'react'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const AuthForm = ({
  initialValues,
  validationSchema,
  mutation,
  location,
  history,
  formTitle,
  refetch,
  children
}) => {
  const [formValues, setFormValues] = useState({})
  const [errors, setErrors] = useState(null)

  const { username, email, password } = formValues
  const { pathname } = location

  const setVariables = () => {
    return pathname === '/auth/login'
      ? { email, password }
      : { username, email, password }
  }

  const setDataHeaders = data => {
    return pathname === '/auth/login'
      ? data.userLogin.token
      : data.userRegister.token
  }

  return (
    <div>
      <div>{formTitle}</div>
      <Mutation mutation={mutation} variables={setVariables()}>
        {(mutationFunction, { loading }) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setErrors(null)
                setFormValues(values)

                const { data } = await mutationFunction()
                localStorage.setItem('token', setDataHeaders(data))
                refetch()

                history.push('/')
              } catch (err) {
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
