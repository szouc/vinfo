import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import PriceHistoryListTable from '../PriceHistoryListTable'

import { Table, Button } from 'antd'

class ProductListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const { products, deleteProductById, deletePriceHistoryById } = this.props
    const data = products.toArray()
    const columns = [
      {
        title: '物品名称',
        key: 'name',
        render: (text, record) => record.get('name')
      },
      {
        title: '物品规格',
        key: 'specs',
        render: (text, record) => record.get('specs')
      },
      {
        title: '当前价格',
        key: 'pricing',
        render: (text, record) => record.get('pricing')
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) =>
          <span>
            <Button
              type='danger'
              size='small'
              onClick={() => deleteProductById(record.get('_id'))}
            >
              删除
            </Button>
          </span>
      }
    ]

    return (
      <Table
        columns={columns}
        expandedRowRender={record =>
          <PriceHistoryListTable
            product={record}
            deletePriceHistoryById={deletePriceHistoryById}
          />}
        dataSource={data}
        rowKey={record => record.get('_id')}
      />
    )
  }
}

export default ProductListTable
