import React from 'react'
import PriceHistoryListTable from '../../containers/PriceHistoryListTable'

import { Table, Button, Popconfirm } from 'antd'

const ProductTable = props => {
  const {
    products,
    pagination,
    deleteProductById,
    deletePriceHistoryById
  } = props
  const data = products
  const columns = [
    {
      title: '物品名称',
      key: 'name',
      render: (text, record) => record.name
    },
    {
      title: '物品规格',
      key: 'specs',
      render: (text, record) => record.specs
    },
    {
      title: '当前价格',
      key: 'pricing',
      render: (text, record) => record.pricing
    },
    {
      title: '相关操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <span className='ant-divider' />
          <Popconfirm
            title='确认删除？'
            onConfirm={deleteProductById(record._id)}
          >
            <Button type='danger' size='small'>
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      expandedRowRender={record => (
        <PriceHistoryListTable
          product={record}
          deletePriceHistoryById={deletePriceHistoryById}
        />
      )}
      dataSource={data}
      pagination={pagination}
      rowKey={record => record._id}
    />
  )
}

export default ProductTable
