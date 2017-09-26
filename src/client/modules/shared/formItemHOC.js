/**
 * a wrapper for redux-form to wrap ant-design component
 */
import React from 'react'

import FormItem from 'antd/es/form/FormItem'
import 'antd/es/form/style/css'

function formItemHOC(Component, ownProps) {
  const getValidateStatus = (error, warning, valid, asyncValidating) => {
    if (error) return 'error'
    if (warning) return 'warning'
    if (valid) return 'success'
    if (asyncValidating) return 'validating'
  }

  const mapError = props => {
    const { meta, input, ...rest } = props
    const { touched, error, warning, valid, asyncValidating } = meta
    if (touched && (error || warning || valid || asyncValidating)) {
      return {
        ...meta,
        ...input,
        validateStatus: getValidateStatus(
          error,
          warning,
          valid,
          asyncValidating
        ),
        help: error || warning,
        ...rest
      }
    }

    return {
      ...meta,
      ...input,
      ...rest
    }
  }

  return class fieldComponent extends React.PureComponent {
    static displayName = `Redux-form-ANTD_${Component.name}`
    render() {
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
      } = mapError(this.props)

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
          <Component {...rest} {...ownProps} />
        </FormItem>
      )
    }
  }
  // fieldComponent.displayName = `Redux-form-ANTD${Component.name}`
}

export default formItemHOC
