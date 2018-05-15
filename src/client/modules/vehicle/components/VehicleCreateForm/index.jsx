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

class VehicleCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  selectedName = nameKey => value => {
    return this.setState({
      [nameKey]: `${this.props.users[value].fullname}(${
        this.props.users[value].username
      })`
    })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit(this.state))}>
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
          onSelect={this.selectedName('captainName')}
          placeholder='所属队长'
          showSearch
        />
        <Field
          name='principal'
          component={DriverSelectFormItem}
          onSelect={this.selectedName('principalName')}
          placeholder='第一司机'
          showSearch
        />
        <Field
          name='secondary'
          component={DriverSelectFormItem}
          onSelect={this.selectedName('secondaryName')}
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
  form: 'vehicleCreateForm',
  validate
})(VehicleCreateForm)
