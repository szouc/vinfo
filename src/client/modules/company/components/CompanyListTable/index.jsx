import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'

import Table from 'antd/es/table'
import Icon from 'antd/es/icon'
import 'antd/es/table/style/css'
import 'antd/es/icon/style/css'

class CompanyListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }
  render() {
    const { companies } = this.props
    const data = companies.toArray()
    const columns = [
      {
        title: '公司名称',
        key: 'name',
        render: (text, record) => record.get('name')
      },
      {
        title: '公司地址',
        key: 'addr',
        render: (text, record) => record.get('addr')
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) =>
          <span>
            <a href='#'>
              Action 一 {record.get('_id')}
            </a>
            <span className='ant-divider' />
            <button onClick={() => this.props.deleteCompanyById(record.get('_id'))}>
              删除
            </button>
            <span className='ant-divider' />
            <a href='#' className='ant-dropdown-link'>
              More actions <Icon type='down' />
            </a>
          </span>
      }
    ]

    return <Table columns={columns} dataSource={data} />
  }
}

export default CompanyListTable
