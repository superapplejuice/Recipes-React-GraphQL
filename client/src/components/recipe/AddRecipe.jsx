import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormField from '../../utils/components/FormField'

const AddRecipe = ({ session }) => {
  const [formErrors, setFormErrors] = useState(null)
  const { username } = session.currentUser
  const categoryList = [
    null,
    'Breakfast',
    'Lunch',
    'Dinner',
    'Supper',
    'Snack',
    'Tea',
    'Drinks',
    'Dessert'
  ]

  const initialValues = {
    name: '',
    category: '',
    description: '',
    instructions: '',
    username
  }

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, 'Please enter at least 4 characters')
      .max(64, 'Maximum 64 characters')
      .required('Please enter a name'),
    category: yup.string().required('Please select a category'),
    description: yup
      .string()
      .min(4, 'Please enter at least 4 characters')
      .max(128, 'Maximum 128 characters')
      .required('Please enter a description'),
    instructions: yup
      .string()
      .min(4, 'Please enter at least 4 characters')
      .max(256, 'Maximum 256 characters')
      .required('Please enter some instructions')
  })

  return (
    <div>
      <div>Add new Recipe</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            setFormErrors(null)

            console.log(values)
            setSubmitting(false)
          } catch (err) {
            const errMessage = err.toString().slice(22)

            setFormErrors(errMessage)
            setSubmitting(false)
          }
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
          handleReset
        }) => (
          <form onSubmit={handleSubmit}>
            <FormField name='name' type='text' label='Name' />
            <FormField name='description' type='text' label='Description' />
            <FormField name='instructions' type='text' label='Instructions' />
            <div>
              <label>Category</label>
              <select
                name='category'
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {categoryList.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                    label={category === null ? 'Choose one' : category}
                  />
                ))}
              </select>
              {errors.category && touched.category && errors.category}
            </div>
            <div>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
              <button type='reset' onClick={handleReset}>
                Clear form
              </button>
            </div>
            <div>{formErrors && <p>{formErrors}</p>}</div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddRecipe
