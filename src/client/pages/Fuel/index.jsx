import React from 'react'

import {
  // FuelListTable,
  FuelCreateForm
} from '@clientModules/vehicle/containers'

import { Row } from 'antd'

const Fuel = () => {
  return (
    <div>
      <Row type='flex' justify='space-around'>
        <FuelCreateForm />
      </Row>
    </div>
  )
}

export default Fuel
