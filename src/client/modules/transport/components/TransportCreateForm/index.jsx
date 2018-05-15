import React from 'react'
import { reduxForm, Field } from 'redux-form/es/immutable'
import { Row, Button } from 'antd'
import { CaptainSelect } from '@clientModules/user/containers'
import { NotAssignedVehicleSelect } from '@clientModules/vehicle/containers'
import { CompanySelect } from '@clientModules/company/containers'
import { ProductSelect } from '@clientModules/product/containers'
import formItemHOC from '@clientModulesShared/formItemHOC'

const CaptainSelectFormItem = formItemHOC(CaptainSelect)
const CompanySelectFormItem = formItemHOC(CompanySelect)
const VehicleSelectFormItem = formItemHOC(NotAssignedVehicleSelect)
const ProductSelectFormItem = formItemHOC(ProductSelect)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'assigner',
    'vehicle',
    'product',
    'fromCompany',
    'toCompany'
  ]
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

class TransportCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  selectedCompanyName = (nameKey, addrKey) => value => {
    return this.setState({
      [nameKey]: this.props.companies[value].name,
      [addrKey]: this.props.companies[value].addr
    })
  }

  selectedVehicleName = (plateKey, engineKey) => value => {
    return this.setState({
      [plateKey]: this.props.vehicles[value].plate,
      [engineKey]: this.props.vehicles[value].engine
    })
  }

  selectedProductName = (nameKey, specsKey) => value => {
    return this.setState({
      [nameKey]: this.props.products[value].name,
      [specsKey]: this.props.products[value].specs
    })
  }

  selectedUserName = nameKey => value => {
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
        <Field
          name='assigner'
          component={CaptainSelectFormItem}
          onSelect={this.selectedUserName('assignerName')}
          placeholder='派单队长'
          showSearch
        />
        <Field
          name='vehicle'
          component={VehicleSelectFormItem}
          onSelect={this.selectedVehicleName('plate', 'engine')}
          placeholder='指派车辆'
          showSearch
        />
        <Field
          name='fromCompany'
          component={CompanySelectFormItem}
          onSelect={this.selectedCompanyName('fromName', 'fromAddr')}
          placeholder='出发公司'
          showSearch
        />
        <Field
          name='toCompany'
          component={CompanySelectFormItem}
          onSelect={this.selectedCompanyName('toName', 'toAddr')}
          placeholder='到达公司'
          showSearch
        />
        <Field
          name='product'
          component={ProductSelectFormItem}
          onSelect={this.selectedProductName('productName', 'productSpecs')}
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
