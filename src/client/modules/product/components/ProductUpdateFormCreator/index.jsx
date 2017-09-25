import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import Input from '@clientModulesShared/forms/Input'
import InputNumber from '@clientModulesShared/forms/InputNumber'
import { Button, Row, Col, Alert } from 'antd'

// import BaseComponent from '@clientModulesShared/BaseComponent'

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

class ProductUpdateForm extends React.PureComponent {
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
            <Field name='pricing' component={InputNumber} placeholder='当前价格' />
          </Col>
          <Col span={4}>
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
          </Col>
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
