import React, { Fragment } from 'react'
import { useField } from 'formik'

const FormField = ({ label, ...props }) => {
  const [field, { touched, error }] = useField(props)

  return (
    <Fragment>
      <label>{label}</label>
      <input {...field} {...props} />
      {touched && error && error}
    </Fragment>
  )
}

export default FormField
