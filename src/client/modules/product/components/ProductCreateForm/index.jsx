import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Col } from 'antd'
import Input from '@clientModulesShared/forms/Input'
import InputNumber from '@clientModulesShared/forms/InputNumber'
import PriceHistoryCreateField from '../PriceHistoryCreateField'

// import BaseComponent from '@clientModulesShared/BaseComponent'

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'specs', 'pricing']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  if (!values.get('priceHistory')) {
    errors.priceHistory = '必填'
  } else {
    const phArrayErrors = []
    values.get('priceHistory').forEach((ph, phIndex) => {
      const phErrors = {}
      if (!ph || !ph.get('start')) {
        phErrors.start = '必填'
        phArrayErrors[phIndex] = phErrors
      }
      if (!ph || !ph.get('end')) {
        phErrors.end = '必填'
        phArrayErrors[phIndex] = phErrors
      }
      if (!ph || !ph.get('price')) {
        phErrors.price = '必填'
        phArrayErrors[phIndex] = phErrors
      }
    })
    if (phArrayErrors.length) {
      errors.priceHistory = phArrayErrors
    }
  }
  return errors
}

class ProductCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
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
        <Row>
          <FieldArray name='priceHistory' component={PriceHistoryCreateField} />
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'productCreateForm',
  validate
})(ProductCreateForm)
