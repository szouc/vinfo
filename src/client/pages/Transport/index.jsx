import React from 'react'

import { TransportCreateForm } from '@clientModules/transport/containers'
import { Row } from 'antd'

class Transport extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Row type='flex' justify='center'>
          <TransportCreateForm />
        </Row>
      </div>
    )
  }
}

export default Transport
