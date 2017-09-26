import React from 'react'

import {
  VehicleCreateForm,
  VehicleListTable
} from '@clientModules/vehicle/containers'

import FuelCreateForm from '../../modules/vehicle/components/FuelCreateForm'

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
      <Row type='flex' justify='space-around'>
        <FuelCreateForm />
      </Row>
    </div>
  )
}

export default Vehicle
