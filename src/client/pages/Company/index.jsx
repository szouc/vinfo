import React from 'react'
import { hot } from 'react-hot-loader'
import {
  CompanyCreateForm,
  CompanyListTable
} from '@clientModules/company/containers'
import { Row } from 'antd'

class Company extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Row>
          <CompanyCreateForm />
        </Row>
        <Row
          style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
        >
          <CompanyListTable />
        </Row>
      </div>
    )
  }
}

export default hot(module)(Company)
