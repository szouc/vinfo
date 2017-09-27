import React from 'react'
import {
  CompanyCreateForm,
  CompanyListTable
} from '@clientModules/company/containers'
import { Row } from 'antd'

const Company = () => {
  return (
    <div>
      <Row>
        <CompanyCreateForm />
      </Row>
      <Row style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <CompanyListTable />
      </Row>
    </div>
  )
}

export default Company
