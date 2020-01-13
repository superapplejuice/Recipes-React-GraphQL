import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { object, string, func, node } from 'prop-types'

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
  const [errors, setErrors] = useState(null)
  const [mutate, { loading }] = useMutation(mutation)
  const { pathname } = location

  const setDataHeaders = data => {
    return pathname === '/auth/login'
      ? data.userLogin.token
      : data.userRegister.token
  }

  return (
    <div>
      <div>{formTitle}</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          try {
            setErrors(null)

            const { data } = await mutate({ variables: values })
            localStorage.setItem('token', setDataHeaders(data))
            refetch()

            history.push('/')
          } catch (err) {
            const errMessage = err.toString().slice(22)

            setErrors(errMessage)
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
    </div>
  )
}

AuthForm.propTypes = {
  initialValues: object.isRequired,
  validationSchema: object.isRequired,
  mutation: object.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  formTitle: string.isRequired,
  refetch: func.isRequired,
  children: node.isRequired
}

export default withRouter(AuthForm)
