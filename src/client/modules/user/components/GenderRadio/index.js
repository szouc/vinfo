import React from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const GenderRadio = (props) => {
  return (
    <RadioGroup name='gender' defaultValue='male' {...props}>
      <RadioButton value='male'>男</RadioButton>
      <RadioButton value='female'>女</RadioButton>
    </RadioGroup>
  )
}

export default GenderRadio
