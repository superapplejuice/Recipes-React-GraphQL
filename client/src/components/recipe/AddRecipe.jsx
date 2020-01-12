import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormField from '../../utils/components/FormField'
import DropdownField from '../../utils/components/DropdownField'

const AddRecipe = () => {
  const [errors, setErrors] = useState(null)
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
    username: ''
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
            setErrors(null)

            console.log(values)
            setSubmitting(false)
          } catch (err) {
            const errMessage = err.toString().slice(22)

            setErrors(errMessage)
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
            <DropdownField
              label='Category'
              name='category'
              value={values.category}
              handleChange={handleChange}
              handleBlur={handleBlur}
              itemList={categoryList}
              errors={errors.category}
              touched={touched.category}
            />
            <div>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
              <button type='reset' onClick={handleReset}>
                Clear form
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddRecipe
