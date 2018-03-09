import React from 'react'

import { Table, Button } from 'antd'

const CompanyTable = ({ companies, deleteCompanyById }) => {
  const deleteCompany = (id) => () => deleteCompanyById(id)
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
          <Button
            size='small'
            type='danger'
            onClick={deleteCompany(record._id)}
          >
            删除
          </Button>
        </span>
      )
    }
  ]

  return <Table columns={columns} dataSource={companies} />
}

export default CompanyTable
