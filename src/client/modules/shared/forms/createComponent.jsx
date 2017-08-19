import 'antd/es/form/style/css'

import React, { PureComponent } from 'react'

import FormItem from 'antd/es/form/FormItem'

export default function createComponent (AntdComponent, mapProps) {
  class fieldComponent extends PureComponent {
    render () {
      const {
        label,
        labelCol,
        wrapperCol,
        help,
        extra,
        required,
        validateStatus,
        hasFeedback = false,
        colon,
        ...rest
      } = mapProps(this.props)

      return (
        <FormItem
          label={label}
          ref='component'
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          help={help}
          hasFeedback={hasFeedback}
          extra={extra}
          required={required}
          validateStatus={validateStatus}
          colon={colon}
        >
          <AntdComponent {...rest} />
        </FormItem>
      )
    }
  }
  fieldComponent.dispayName = `Redux-form-ANTD${AntdComponent.dispayName}`

  return fieldComponent
}
