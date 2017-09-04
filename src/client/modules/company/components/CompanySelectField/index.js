import React, { Component } from 'react'
import { Field } from 'redux-form/es/immutable'

import { Select } from '../../../shared/forms/index'

class CompanySelectField extends Component() {
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
      />
    )
  }
}

export default CompanySelectField
