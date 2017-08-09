// @flow

import { Field, reduxForm } from 'redux-form'

import React from 'react'

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <Field name='firstName' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <Field name='lastName' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <Field name='email' component='input' type='email' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  form: 'contact'
})(ContactForm)

export default ContactForm
