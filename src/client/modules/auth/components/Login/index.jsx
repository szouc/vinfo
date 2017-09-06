import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import formItemHOC from '@clientModulesShared/formItemHOC'

import { Field, reduxForm } from 'redux-form/es/immutable'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'

import style from './style.css'
import 'antd/es/input/style/css'
import 'antd/es/button/style/css'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'
import 'antd/es/alert/style/css'

const AntInput = formItemHOC(Input)

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'password']
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

class Login extends BaseComponent {
  constructor (props) {
    super(props)
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      errorMessage
    } = this.props
    return (
      <Row type='flex' justify='center'>
        <form onSubmit={handleSubmit} className={style.register_input}>
          {errorMessage
            ? <Row>
              <Alert message={errorMessage} type='error' banner />
            </Row>
            : null}
          <Row>
            <Field name='username' component={AntInput} label='工号' />
          </Row>
          <Row>
            <Field
              name='password'
              component={AntInput}
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
                disabled={pristine || submitting}
              >
                确定
              </Button>
            </Col>
            <Col span={8}>
              <Button
                size='large'
                type='default'
                disabled={pristine || submitting}
                onClick={reset}
              >
                取消
              </Button>
            </Col>
          </Row>
        </form>
      </Row>
    )
  }
}

export default reduxForm({
  form: 'registerForm',
  validate,
  warn
})(Login)
