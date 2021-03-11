import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Initial values can be hooked to an inpute by using input's name attribute same as any one of the key in initial values object
const initialValues = {
  name: 'Vishwas',
  email: '',
  channel: ''
}

const onSubmit = values => {
  console.log('Form data', values)
}

// This function is used to handle validations and is passed as 3rd argument to the useFormik hook
// const validate = values => {
  // this function must return an object (here we have defined errors object and we are returning it down below)
  // The object that we return should have same keys as we have in initial values object
  // The value of each key should be a string defining error, as illustrated below
//   const errors = {}

//   if (!values.name) {
//     errors.name = 'Required'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email format'
//   }

//   if (!values.channel) {
//     errors.channel = 'Required'
//   }

//   return errors
// }

// Yup is a great validation library we can easily integrate it with formik, we just need to defined an object by invoking Yup.object({}) and passing keys representing form fields and values will first define type of field and then all validation (chaining)
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  channel: Yup.string().required('Required')
})

function OldYoutubeForm () {
  //UseFormik hook is used to configure formik, we pass initial values to it, a function to handle submit and validation object
  const formik = useFormik({
    initialValues,
    onSubmit, // A method which gets exectuted on form submission
    // validate,
    validationSchema
  })

  console.log('formik.touched', formik.touched)

  // To bind an input to formik, we bind onChange function to formik.handleChange method
  //We also need to set value of input to formik.values[name] (we have put name here, which corresponds to the text input with name attribute which has value of name and formik initial values also has a name property thereby making a connection)
  return (
    // formik.handleSubmit will be executed on form submission

    // For dispalying errors we have formik.errors object which contains key value pair where key represesnts field and value respresents error
    // formik.touched inclues all the fields that have been visited / interracted by user.This is useful because we only want to show errors for the fields that have been visited by user
    <form onSubmit={formik.handleSubmit}>
      <div className='form-control'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          // Instead of hardcoding all the props we can use formik.getFieldProps('name') name here is any field name that we want to get props for. We can do the same for other fields down below
          {...formik.getFieldProps('name')}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='error'>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='error'>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='channel'>Channel</label>
        <input
          type='text'
          id='channel'
          name='channel'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
        />
        {formik.touched.channel && formik.errors.channel ? (
          <div className='error'>{formik.errors.channel}</div>
        ) : null}
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default OldYoutubeForm
