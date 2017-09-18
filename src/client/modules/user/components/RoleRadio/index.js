import React from 'react'
import { Radio } from 'antd'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const RoleRadio = (props) => {
  return (
    <RadioGroup name='role' {...props}>
      <RadioButton value='driver'>司机</RadioButton>
      <RadioButton value='captain'>队长</RadioButton>
      <RadioButton value='accountant'>会计</RadioButton>
      <RadioButton value='manager'>经理</RadioButton>
    </RadioGroup>
  )
}

export default RoleRadio
