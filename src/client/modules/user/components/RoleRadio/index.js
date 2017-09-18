import React from 'react'
import { Radio } from 'antd'
import { DRIVER, CAPTAIN, ACCOUNTANT, MANAGER } from '../constants'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const RoleRadio = props => {
  return (
    <RadioGroup name='role' {...props}>
      <RadioButton value={DRIVER}>司机</RadioButton>
      <RadioButton value={CAPTAIN}>队长</RadioButton>
      <RadioButton value={ACCOUNTANT}>会计</RadioButton>
      <RadioButton value={MANAGER}>经理</RadioButton>
    </RadioGroup>
  )
}

export default RoleRadio
