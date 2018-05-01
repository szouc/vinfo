import React from 'react'
import { reduxForm, Field } from 'redux-form/es/immutable'
import { Row, Button } from 'antd'
import { Input, DatePicker } from '@clientModulesShared/forms'
import { DriverSelect, CaptainSelect } from '@clientModules/user/containers'
import formItemHOC from '@clientModulesShared/formItemHOC'

const DriverSelectFormItem = formItemHOC(DriverSelect)
const CaptainSelectFormItem = formItemHOC(CaptainSelect)

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

  getUserFromSelect = value => {
    return this.props.users[value]
  }

  setUserToSelect = value => {
    return value ? value.username : ''
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='plate' component={Input} placeholder='车牌号' autoFocus />
        <Field name='engine' component={Input} placeholder='发动机号' />
        <Field name='model' component={Input} placeholder='车型' />
        <Field
          name='purchaseDate'
          component={DatePicker}
          placeholder='购买日期'
        />
        <Field name='initMile' component={Input} placeholder='初始里程' />
        <Field
          name='captain'
          component={CaptainSelectFormItem}
          format={this.setUserToSelect}
          parse={this.getUserFromSelect}
          showSearch
        />
        <Field
          name='principal'
          component={DriverSelectFormItem}
          format={this.setUserToSelect}
          parse={this.getUserFromSelect}
          placeholder='第一司机'
          showSearch
        />
        <Field
          name='secondary'
          component={DriverSelectFormItem}
          format={this.setUserToSelect}
          parse={this.getUserFromSelect}
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
