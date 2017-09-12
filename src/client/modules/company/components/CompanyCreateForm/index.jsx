import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Col, Alert } from 'antd'
import { Input } from '@clientModulesShared/forms'

import BaseComponent from '@clientModulesShared/BaseComponent'

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'addr']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

class CompanyCreateForm extends BaseComponent {
  constructor(props) {
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
      <form onSubmit={handleSubmit}>
        {errorMessage ? (
          <Row>
            <Alert message={errorMessage} type='error' banner />
          </Row>
        ) : null}
        <Row type='flex' justify='space-between'>
          <Col span={8}>
            <Field name='name' component={Input} placeholder='公司名称' />
          </Col>
          <Col span={12}>
            <Field name='addr' component={Input} placeholder='公司地址' />
          </Col>
          <Col span={4}>
            <Button
              size='large'
              type='primary'
              htmlType='submit'
              disabled={pristine || submitting}
            >
              添加
            </Button>
            <Button
              size='large'
              type='default'
              disabled={pristine || submitting}
              onClick={reset}
            >
              清空
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'companyCreateForm',
  validate
})(CompanyCreateForm)
