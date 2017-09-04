import React, { Component } from 'react'
import Table from 'antd/es/table'
import Icon from 'antd/es/icon'
import 'antd/es/table/style/css'
import 'antd/es/icon/style/css'

class CompanyListTable extends Component {
  componentDidMount() {
    this.props.getAllCompanies()
  }
  render() {
    const { companies } = this.props
    const data = companies.valueSeq().toJS()
    const columns = [
      {
        title: '公司名称',
        dataIndex: 'name',
        key: 'name',
        render: text =>
          <a href='#'>
            {text}
          </a>
      },
      {
        title: '公司地址',
        dataIndex: 'addr',
        key: 'addr'
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) =>
          <span>
            <a href='#'>
              Action 一 {record._id}
            </a>
            <span className='ant-divider' />
            <button onClick={() => this.props.deleteCompanyById(record._id)}>Delete</button>
            <span className='ant-divider' />
            <a href='#' className='ant-dropdown-link'>
              More actions <Icon type='down' />
            </a>
          </span>
      }
    ]

    // const data = [
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     addr: 'New York No. 1 Lake Park'
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     addr: 'London No. 1 Lake Park'
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     addr: 'Sidney No. 1 Lake Park'
    //   }
    // ]

    return <Table columns={columns} dataSource={data} />
  }
}

export default CompanyListTable
