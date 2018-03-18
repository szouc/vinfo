import React from 'react'
import { Spin } from 'antd'

const withLoading = (delay = 0) => WrappedComponent => ({
  loading,
  ...rest
}) => (
  <Spin spinning={loading} delay={delay}>
    <WrappedComponent {...rest} />
  </Spin>
)

const withNoDelayLoading = withLoading()
const withDelayLoading = withLoading(500)

export { withLoading, withNoDelayLoading, withDelayLoading }
