import React from 'react'

import {
  VehicleCreateForm,
  VehicleListTable
} from '@clientModules/vehicle/containers'

import { Row } from 'antd'

const Vehicle = () => {
  return (
    <div>
      <Row type='flex' justify='center'>
        <VehicleCreateForm />
      </Row>
      <Row style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <VehicleListTable />
      </Row>
    </div>
  )
}

export default Vehicle
