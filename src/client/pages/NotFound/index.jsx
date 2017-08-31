// @flow

import { Field, reduxForm } from 'redux-form/es/immutable'

import { Input, Select } from '../../modules/shared/forms/index'
import React from 'react'
import style from './style.css'

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'password']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必填'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.username && values.username.length < 5) {
    warnings.username = '工号是否没有输入完整'
  }
  return warnings
}

const NotFoundPage = () => {
  return (
    <div>
      <p>Page not found</p>
      <div className={style.register_input}>
        <Field name='username' component={Input} label='工号' />
      </div>
      <div className={style.register_input}>
        <Field name='password' component={Input} label='密码' type='password' />
      </div>
      <div className={style.register_input}>
        <Field
          name='roles'
          component={Select}
          label='角色'
          options={options}
          mode='default'
        />
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'NotFoundForm',
  validate,
  warn
})(NotFoundPage)
