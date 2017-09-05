import React from 'react'
import BaseComponent from '../../../shared/BaseComponent'

import { Field } from 'redux-form/es/immutable'

import { Select } from '../../../shared/forms/index'
import { fromJS } from 'immutable'

class CompanySelectField extends BaseComponent {
  constructor(props) {
    super(props)
    this.props.addrOptions = fromJS({})
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }

  handleNameChange = (event, value) => {
    event.preventDefault()
    this.props.addrOptions = this.props.nameOptions.filter((value, key) => value.get('name') === value)
  }

  render() {
    const { nameKey, addrKey, label } = this.props
    const options = this.props.nameOptions
    return (
      <div>
        <Field
          name={nameKey}
          label={label}
          component={Select}
          options={options}
          placeholder='公司名称'
          valueKey='name'
          labelKey='name'
          onChange={(event, value) => this.handleNameChange(event, value)}
        />
        <Field
          name={addrKey}
          label={label}
          component={Select}
          options={this.props.addrOptions}
          placeholder='公司地址'
          valueKey='addr'
          labelKey='addr'
        />
      </div>
    )
  }
}

export default CompanySelectField
