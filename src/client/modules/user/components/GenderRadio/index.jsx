import React from 'react'
import { Radio } from 'antd'
import { MALE, FEMALE } from '../constants'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const GenderRadio = props => {
  return (
    <RadioGroup name='gender' defaultValue='male' {...props}>
      <RadioButton value={MALE}>男</RadioButton>
      <RadioButton value={FEMALE}>女</RadioButton>
    </RadioGroup>
  )
}

export default GenderRadio
