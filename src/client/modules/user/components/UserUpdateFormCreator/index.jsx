import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import Input from '@clientModulesShared/forms/Input'
import InputNumber from '@clientModulesShared/forms/InputNumber'
import DatePicker from '@clientModulesShared/forms/DatePicker'
import { Button, Row, Alert } from 'antd'

import BaseComponent from '@clientModulesShared/BaseComponent'

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'specs', 'pricing']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

const showError = errorMessage => {
  if (!errorMessage) {
    return null
  }
  return (
    <Row>
      <Alert message={errorMessage} type='error' banner />
    </Row>
  )
}

class ProductUpdateForm extends BaseComponent {
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
        {showError(errorMessage)}
        <Row type='flex' justify='space-between'>
          <Field name='license' component={Input} placeholder='驾驶证号' />
          <Field name='cert' component={Input} placeholder='运输证号' />
          <Field name='cert_expired' component={DatePicker} placeholder='运输证到期日期' />
          <Field name='id_front' component={InputNumber} placeholder='身份证正面' />
          <Field name='id_back' component={InputNumber} placeholder='身份证反面' />
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            disabled={pristine || submitting}
          >
            更新
          </Button>
          <Button
            size='large'
            type='default'
            disabled={pristine || submitting}
            onClick={reset}
          >
            取消
          </Button>
        </Row>
      </form>
    )
  }
}

export default productId =>
  reduxForm({
    form: `productUpdateForm_${productId}`,
    validate
  })(ProductUpdateForm)
