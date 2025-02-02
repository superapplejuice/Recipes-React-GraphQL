import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { object } from 'prop-types'

import { CREATE_RECIPE } from '../../graphql/mutations'
import {
  FETCH_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES
} from '../../graphql/queries'
import withAuth from '../../utils/functions/withAuth'

import FormField from '../../utils/components/FormField'

const AddRecipe = ({ session, history }) => {
  const { username } = session.currentUser
  const [formErrors, setFormErrors] = useState(null)
  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE, {
    update: (cache, { data: { createRecipe } }) => {
      const { recipesList } = cache.readQuery({ query: FETCH_RECIPES })

      return cache.writeQuery({
        query: FETCH_RECIPES,
        // add the newly created recipe to the list
        data: { recipesList: [createRecipe, ...recipesList] }
      })
    },
    refetchQueries: () => [
      { query: FETCH_RECIPES },
      { query: GET_CURRENT_USER },
      {
        query: GET_USER_RECIPES,
        variables: { username }
      }
    ]
  })

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
    username,
    imageUrl: ''
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
      .required('Please enter some instructions'),
    imageUrl: yup
      .string()
      .url('Please enter a valid url')
      .required('Please enter a valid URL for your image')
  })

  return (
    <div>
      <div>Add new Recipe</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setFormErrors(null)

            await createRecipe({ variables: values })

            history.push('/')
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
            <FormField name='imageUrl' type='text' label='Image' />
            <div>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
              <button type='reset' onClick={handleReset}>
                Clear form
              </button>
            </div>
            <div>
              {loading && <p>Submitting...</p>}
              {formErrors && <p>{formErrors}</p>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

AddRecipe.propTypes = {
  session: object.isRequired,
  history: object.isRequired
}

const authCondition = session => session && session.currentUser

export default withAuth(authCondition)(withRouter(AddRecipe))
