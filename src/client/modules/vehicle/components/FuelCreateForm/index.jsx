import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form/es/immutable'
import { Row, Button } from 'antd'
import FuelCreateFormItemWrapper from './FuelCreateFormItemWrapper'
import { VehicleSelectByUser } from '@clientModules/vehicle/containers'
import formItemHOC from '@clientModulesShared/formItemHOC'

const VehicleSelectByUserFormItem = formItemHOC(VehicleSelectByUser)

const validate = values => {
  const errors = {}
  const requiredFields = ['vehicleId', 'fuels']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

class FuelCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='vehicleId'
          component={VehicleSelectByUserFormItem}
          autoFocus
        />
        <Row
          type='flex'
          justify='space-between'
          style={{ background: '#fff', padding: 24, margin: 0, minHeight: 180 }}
        >
          <FieldArray name='fuels' component={FuelCreateFormItemWrapper} />
        </Row>
        <Row type='flex' justify='space-around'>
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
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fuelCreateForm',
  validate
})(FuelCreateForm)
