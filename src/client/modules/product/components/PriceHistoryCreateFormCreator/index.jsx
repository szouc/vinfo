import React from 'react'
import { FieldArray, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Col, Alert } from 'antd'
import PriceHistoryCreateField from '../PriceHistoryCreateField'

// import BaseComponent from '@clientModulesShared/BaseComponent'

const validate = values => {
  const errors = {}
  const requiredFields = ['price_history']
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

class PriceHistoryCreateForm extends React.PureComponent {
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
          <Col span={20}>
            <FieldArray
              name='price_history'
              component={PriceHistoryCreateField}
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
      </form>
    )
  }
}

export default productId =>
  reduxForm({
    form: `priceHistoryCreateForm_${productId}`,
    validate
  })(PriceHistoryCreateForm)
