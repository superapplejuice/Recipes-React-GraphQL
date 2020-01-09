import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'

import { REGISTER_USER } from '../../graphql/mutations'

import FormField from '../../utils/components/FormField'

const Register = () => {
  const whitespaceRegex = /^\S+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .matches(whitespaceRegex, 'No whitespaces allowed')
      .min(4, 'Please enter at least 4 characters')
      .required('Please enter a username'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter an email'),
    password: yup
      .string()
      .matches(
        passwordRegex,
        'Please enter at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .min(8, 'Please enter at least 8 characters')
      .required('Please enter a password'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  })

  return (
    <div>
      <div>Register Form</div>
      <Mutation mutation={REGISTER_USER}>
        {userRegister => {
          return (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const { username, email, password } = values

                try {
                  console.log(username, email, password)
                  setSubmitting(false)
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <FormField name='username' type='text' label='Username' />
                  </div>
                  <div>
                    <FormField name='email' type='email' label='Email' />
                  </div>
                  <div>
                    <FormField
                      name='password'
                      type='password'
                      label='Password'
                    />
                  </div>
                  <div>
                    <FormField
                      name='passwordConfirm'
                      type='password'
                      label='Confirm Password'
                    />
                  </div>
                  <button type='submit' disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          )
        }}
      </Mutation>
    </div>
  )
}

export default Register
