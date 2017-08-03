// @flow

import React from 'react'
import Button from 'antd/lib/button'
// import 'antd/lib/button/style/index.css'

type Props = {
  label: string,
  handleClick: Function,
}

const RaisedButton = ({ label, handleClick }: Props) =>
  <Button type='primary' onClick={handleClick}>{label}</Button>

export default RaisedButton
