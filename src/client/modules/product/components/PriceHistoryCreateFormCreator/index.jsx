import React from 'react'
import { FieldArray, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Col } from 'antd'
import PriceHistoryCreateField from '../PriceHistoryCreateField'

// import BaseComponent from '@clientModulesShared/BaseComponent'

const validate = values => {
  const errors = {}
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

class PriceHistoryCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row type='flex' justify='space-between'>
          <Col span={20}>
            <FieldArray
              name='priceHistory'
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
