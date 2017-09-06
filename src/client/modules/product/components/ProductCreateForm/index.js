import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import InputNumber from 'antd/es/input-number'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Alert from 'antd/es/alert'
import DatePicker from 'antd/es/date-picker'

import BaseComponent from '@clientModulesShared/BaseComponent'
import formItemHOC from '@clientModulesShared/formItemHOC'

import 'antd/es/button/style/css'
import 'antd/es/input/style/css'
import 'antd/es/input-number/style/css'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'
import 'antd/es/alert/style/css'
import 'antd/es/date-picker/style/css'

const { RangePicker } = DatePicker
const AntRangePicker = formItemHOC(RangePicker)
const AntInput = formItemHOC(Input)
const AntInputNumber = formItemHOC(InputNumber)

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
            <Field name='name' component={AntInput} placeholder='物品名称' />
          </Col>
          <Col span={8}>
            <Field name='specs' component={AntInput} placeholder='物品规格' />
          </Col>
          <Col span={4}>
            <Field
              name='pricing'
              component={AntInputNumber}
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
        <Field name='RangeDate' component={AntRangePicker} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'productCreateForm',
  validate
})(ProductCreateForm)
