import React from 'react'
import BaseComponent from '../../../shared/BaseComponent'

import { Field } from 'redux-form/es/immutable'

import { Select } from '../../../shared/forms/index'

class CompanySelectField extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, label } = this.props
    const options = this.props.options.valueSeq().toJS()
    return (
      <Field
        name={name}
        component={Select}
        label={label}
        options={options}
        mode='default'
        valueKey='name'
        labelKey='name'
      />
    )
  }
}

export default CompanySelectField
