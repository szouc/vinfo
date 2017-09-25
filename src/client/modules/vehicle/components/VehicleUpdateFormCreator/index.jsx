import React from 'react'
import { reduxForm, Field } from 'redux-form/es/immutable'
import { Row, Button } from 'antd'
import { Input, DatePicker } from '@clientModulesShared/forms'
import { DriverSelect } from '@clientModules/user/containers'
import formItemHOC from '@clientModulesShared/formItemHOC'

const DriverSelectFormItem = formItemHOC(DriverSelect)

const validate = values => {
  const errors = {}
  const requiredFields = ['plate', 'engine']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

class VehicleUpdateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='plate' component={Input} placeholder='车牌号' autoFocus />
        <Field name='engine' component={Input} placeholder='发动机号' />
        <Field name='model' component={Input} placeholder='车型' />
        <Field name='purchase_date' component={DatePicker} placeholder='购买日期' />
        <Field name='init_mile' component={Input} placeholder='初始里程' />
        <Field
          name='principal'
          component={DriverSelectFormItem}
          placeholder='第一司机'
          showSearch
        />
        <Field
          name='secondary'
          component={DriverSelectFormItem}
          placeholder='第二司机'
          showSearch
        />
        <Row type='flex' justify='space-between'>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            disabled={pristine || submitting}
          >
            更改
          </Button>
          <Button
            size='large'
            type='default'
            disabled={pristine || submitting}
            onClick={reset}
          >
            还原
          </Button>
        </Row>
      </form>
    )
  }
}

export default vehicleId =>
  reduxForm({
    form: `vehicleUpdateForm_${vehicleId}`,
    validate
  })(VehicleUpdateForm)
