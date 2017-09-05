import React from 'react'
import BaseComponent from '../BaseComponent'

import { Field } from 'redux-form/es/immutable'

import { Select } from './'

class SelectField extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, label, valueKey, labelKey, options } = this.props
    return (
      <Field
        name={name}
        component={Select}
        label={label}
        options={options}
        mode='default'
        valueKey={valueKey}
        labelKey={labelKey}
      />
    )
  }
}

export default SelectField
