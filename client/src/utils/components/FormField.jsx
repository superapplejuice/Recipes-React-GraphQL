import React from 'react'
import { useField } from 'formik'

const FormField = ({ label, ...props }) => {
  const [field, { touched, error }] = useField(props)

  return (
    <div>
      <label>{label}</label>
      <input {...field} {...props} />
      {touched && error && error}
    </div>
  )
}

export default FormField
