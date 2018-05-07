import React from 'react'

import { Table, Button, Popconfirm } from 'antd'

const CompanyTable = ({ companies, pagination, deleteCompanyById }) => {
  const deleteCompany = id => () => deleteCompanyById(id)
  const columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
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
          <span className='ant-divider' />
          <Popconfirm title='确认删除？' onConfirm={deleteCompany(record._id)}>
            <Button type='danger' size='small'>
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <Table columns={columns} dataSource={companies} pagination={pagination} />
  )
}

export default CompanyTable
