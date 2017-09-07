import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form/es/immutable'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Alert from 'antd/es/alert'
import Input from '@clientModulesShared/forms/Input'
import InputNumber from '@clientModulesShared/forms/InputNumber'
import PriceHistoryCreateField from '../PriceHistoryCreateField'

import BaseComponent from '@clientModulesShared/BaseComponent'

import 'antd/es/button/style/css'
import 'antd/es/input-number/style/css'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'
import 'antd/es/alert/style/css'

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

class ProductCreateForm extends BaseComponent {
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
          <Col span={8}>
            <Field name='name' component={Input} placeholder='物品名称' />
          </Col>
          <Col span={8}>
            <Field name='specs' component={Input} placeholder='物品规格' />
          </Col>
          <Col span={4}>
            <Field
              name='pricing'
              component={InputNumber}
              placeholder='当前价格'
            />
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
        <FieldArray name='price_history' component={PriceHistoryCreateField} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'productCreateForm',
  validate
})(ProductCreateForm)
