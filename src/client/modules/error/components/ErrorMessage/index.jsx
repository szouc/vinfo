import React from 'react'
import { Alert } from 'antd'

const ErrorMessage = props => {
  return props.message ? (
    <Alert message={props.message} type='error' banner />
  ) : null
}

export default ErrorMessage
