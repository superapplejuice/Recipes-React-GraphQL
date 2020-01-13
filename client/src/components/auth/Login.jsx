import React from 'react'
import * as yup from 'yup'
import { func } from 'prop-types'

import { LOGIN_USER } from '../../graphql/mutations'

import AuthForm from '../../utils/components/AuthForm'
import FormField from '../../utils/components/FormField'

const Login = ({ refetch }) => {
  const formTitle = 'Login'

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter an email'),
    password: yup.string().required('Please enter your password')
  })

  return (
    <AuthForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      mutation={LOGIN_USER}
      formTitle={formTitle}
      refetch={refetch}
    >
      <FormField name='email' type='email' label='Email' />
      <FormField name='password' type='password' label='Password' />
    </AuthForm>
  )
}

Login.propTypes = {
  refetch: func.isRequired
}

export default Login
