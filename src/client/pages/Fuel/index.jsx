import React from 'react'

import {
  // FuelListTable,
  FuelCreateForm
} from '@clientModules/vehicle/containers'

import { Row } from 'antd'

class Fuel extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Row type='flex' justify='space-around'>
          <FuelCreateForm />
        </Row>
      </div>
    )
  }
}

export default Fuel
