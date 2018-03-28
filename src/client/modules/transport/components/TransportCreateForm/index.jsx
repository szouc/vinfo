import React from 'react'
import { reduxForm, Field } from 'redux-form/es/immutable'
import { Row, Button } from 'antd'
import { CaptainSelect } from '@clientModules/user/containers'
import { NotAssignedVehicleSelect } from '@clientModules/vehicle/containers'
import { CompanySelect } from '@clientModules/company/containers'
import { ProductSelect } from '@clientModules/product/containers'
import formItemHOC from '@clientModulesShared/formItemHOC'
import { fromJS } from 'immutable'

const CaptainSelectFormItem = formItemHOC(CaptainSelect)
const CompanySelectFormItem = formItemHOC(CompanySelect)
const VehicleSelectFormItem = formItemHOC(NotAssignedVehicleSelect)
const ProductSelectFormItem = formItemHOC(ProductSelect)

const validate = values => {
  const errors = {}
  const requiredFields = ['assigner', 'vehicle', 'product']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  const errorsFrom = {}
  if (!values.getIn(['from', 'company'])) {
    errorsFrom['company'] = '必填'
  }
  const errorsTo = {}
  if (!values.getIn(['to', 'company'])) {
    errorsTo['company'] = '必填'
  }
  errors['from'] = errorsFrom
  errors['to'] = errorsTo
  return errors
}

class TransportCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  getValueFromSelect = propsKey => value => {
    return fromJS(this.props[propsKey][value])
  }

  setValueToSelect = valueKey => value => {
    return value ? value.get(valueKey) : ''
  }

  getUserFromSelect = this.getValueFromSelect('users')
  setUserToSelect = this.setValueToSelect('username')
  getCompanyFromSelect = this.getValueFromSelect('companies')
  setCompanyToSelect = this.setValueToSelect('_id')
  getProductFromSelect = this.getValueFromSelect('products')
  setProductToSelect = this.setValueToSelect('_id')
  getVehicleFromSelect = this.getValueFromSelect('vehicles')
  setVehicleToSelect = this.setValueToSelect('_id')

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='assigner'
          component={CaptainSelectFormItem}
          format={this.setUserToSelect}
          parse={this.getUserFromSelect}
          placeholder='派单队长'
          showSearch
        />
        <Field
          name='vehicle'
          component={VehicleSelectFormItem}
          format={this.setVehicleToSelect}
          parse={this.getVehicleFromSelect}
          placeholder='指派车辆'
          showSearch
        />
        <Field
          name='from.company'
          component={CompanySelectFormItem}
          format={this.setCompanyToSelect}
          parse={this.getCompanyFromSelect}
          placeholder='出发公司'
          showSearch
        />
        <Field
          name='to.company'
          component={CompanySelectFormItem}
          format={this.setCompanyToSelect}
          parse={this.getCompanyFromSelect}
          placeholder='到达公司'
          showSearch
        />
        <Field
          name='product'
          component={ProductSelectFormItem}
          format={this.setProductToSelect}
          parse={this.getProductFromSelect}
          placeholder='运输产品'
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
  form: 'transportCreateForm',
  validate
})(TransportCreateForm)
