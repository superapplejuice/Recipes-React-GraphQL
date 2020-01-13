import React from 'react'
import { useField } from 'formik'
import { string, object } from 'prop-types'

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

FormField.propTypes = {
  label: string.isRequired,
  props: object
}

export default FormField
