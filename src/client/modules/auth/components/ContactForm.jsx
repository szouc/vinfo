import { Field, reduxForm } from 'redux-form'
import { Link, Route } from 'react-router-dom'

import React from 'react'
import Loadable from 'react-loadable'

let LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: "HomeComponent" */ './Home.jsx'),
  loading: () => null
})

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
      <div>
        <Link to='/home'>Home</Link>
        <Route path='/home' render={() => (<LoadableHome />)} />
      </div>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm
