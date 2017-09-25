import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import { Select } from 'antd'

const Option = Select.Option

class CompanySelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }

  render() {
    const { companies, ...rest } = this.props
    const options = companies
    const optionsList = options.map(company => (
      <Option value={company._id}>
        {company.name}({company.addr})
      </Option>
    ))

    return (
      <Select style={{ width: '100%' }} {...rest}>
        {optionsList}
      </Select>
    )
  }
}

export default CompanySelect
