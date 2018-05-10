import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import { Select } from 'antd'

const Option = Select.Option

class CompanySelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    placeholder: '请选择公司'
  }

  componentDidMount() {
    this.props.getCompanies(1, 20)
  }

  render() {
    const { companies, placeholder, ...rest } = this.props
    const options = companies || []
    const optionsList = options.map(company => (
      <Option key={company._id} value={company._id}>
        {company.name}({company.addr})
      </Option>
    ))

    return (
      <Select style={{ width: '100%' }} {...rest}>
        <Option value='' className='first-option' disabled>
          {placeholder}
        </Option>
        {optionsList}
      </Select>
    )
  }
}

export default CompanySelect
