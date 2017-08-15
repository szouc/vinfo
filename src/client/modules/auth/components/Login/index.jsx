import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { Input } from '../../../../shared/forms/index'
import style from './style.css'
import Button from 'antd/es/button'
import 'antd/es/button/style/css'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.get('username') && values.get('username').length < 5) {
    warnings.username = '工号是否没有输入完整'
  }
  return warnings
}

const login = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <Row type='flex' justify='center'>
      <form onSubmit={handleSubmit} className={style.register_input}>
        <Row>
          <Field
            name='username'
            component={Input}
            label='工号'
          />
        </Row>
        <Row>
          <Field
            name='password'
            component={Input}
            label='密码'
            type='password'
          />
        </Row>
        <Row type='flex' justify='space-around'>
          <Col span={8}>
            <Button
              size='large'
              type='primary'
              htmlType='submit'
              disabled={pristine || submitting}>
              确定
            </Button>
          </Col>
          <Col span={8}>
            <Button
              size='large'
              type='default'
              disabled={pristine || submitting}
              onClick={reset}>
              取消
            </Button>
          </Col>
        </Row>
      </form>
    </Row>
  )
}

export default reduxForm({
  form: 'registerForm',
  validate,
  warn
})(login)
