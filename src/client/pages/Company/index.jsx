import React from 'react'
import CompanyCreateForm from '../../modules/company/containers/CompanyCreateForm'
import CompanyListTable from '../../modules/company/containers/CompanyListTable'
import Row from 'antd/es/row'
// import Col from 'antd/es/col'
import 'antd/es/row/style/css'
// import 'antd/es/col/style/css'

const Company = () => {
  return (
    <div>
      <Row>
        <CompanyCreateForm />
      </Row>
      <Row>
        <CompanyListTable />
      </Row>
    </div>
  )
}

export default Company
