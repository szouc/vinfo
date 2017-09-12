import React from 'react'
import {
  CompanyCreateForm,
  CompanyListTable,
  CompanySelect
} from '@clientModules/company/containers'
import { Row } from 'antd'

const Company = () => {
  return (
    <div>
      <Row>
        <CompanyCreateForm />
      </Row>
      <Row>
        <CompanySelect />
      </Row>
      <Row>
        <CompanyListTable />
      </Row>
    </div>
  )
}

export default Company
