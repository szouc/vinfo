import React from 'react'
import Spin from 'antd/lib/spin'
// import 'antd/lib/spin/style/index.css'

export default function Loading ({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return (
      <div>
        <Spin />
      </div>
    )
  } else if (error && !isLoading) {
    return <p>Error!</p>
  } else {
    return null
  }
}
