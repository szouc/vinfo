import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'

import { Table, Button } from 'antd'

class CompanyListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }
  render() {
    const { companies } = this.props
    const data = companies
    const columns = [
      {
        title: '公司名称',
        key: 'name',
        render: (text, record) => record.name
      },
      {
        title: '公司地址',
        key: 'addr',
        render: (text, record) => record.addr
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              size='small'
              type='danger'
              onClick={() => this.props.deleteCompanyById(record._id)}
            >
              删除
            </Button>
          </span>
        )
      }
    ]

    return <Table columns={columns} dataSource={data} />
  }
}

export default CompanyListTable
