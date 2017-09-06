import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import Select from 'antd/es/select'
import 'antd/es/select/style/css'

const Option = Select.Option

class CompanySelect extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }

  render() {
    const { companyEntity, ...rest } = this.props
    const options = companyEntity.toArray()
    const optionsList = options.map(company =>
      <Option value={company.get('_id')}>
        {company.get('name')}({company.get('addr')})
      </Option>
    )

    return (
      <Select style={{ width: '100%' }} {...rest}>
        {optionsList}
      </Select>
    )
  }
}

export default CompanySelect
