import React from 'react'

import {
  VehicleCreateForm,
  VehicleListTable
} from '@clientModules/vehicle/containers'

import { Row } from 'antd'

const Vehicle = () => {
  return (
    <div>
      <Row type='flex' justify='space-around'>
        <VehicleCreateForm />
      </Row>
      <Row type='flex' justify='space-around'>
        <VehicleListTable />
      </Row>
    </div>
  )
}

export default Vehicle
