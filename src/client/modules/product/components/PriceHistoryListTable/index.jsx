import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import moment from 'moment'

import { Table, Button } from 'antd'
import PriceHistoryCreateFormCreator from '../../containers/PriceHistoryCreateFormCreator'
import ProductUpdateFormCreator from '../../containers/ProductUpdateFormCreator'

class PriceHistoryListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { product, deletePriceHistoryById } = this.props
    const data = product.price_history
    const columns = [
      {
        title: '开始日期',
        key: 'name',
        render: (text, record) => moment(record.start).format('LL')
      },
      {
        title: '结束日期',
        key: 'specs',
        render: (text, record) => moment(record.end).format('LL')
      },
      {
        title: '价格',
        key: 'price',
        render: (text, record) => record.price
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              size='small'
              onClick={deletePriceHistoryById(product._id, record._id)}
            >
              删除
            </Button>
          </span>
        )
      }
    ]

    const ProductUpdateFormById = ProductUpdateFormCreator(product._id)
    const PriceHistoryCreateFormById = PriceHistoryCreateFormCreator(
      product._id
    )

    return (
      <div>
        <ProductUpdateFormById product={product} />
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record._id}
          pagination={false}
        />
        <PriceHistoryCreateFormById product={product} />
      </div>
    )
  }
}

export default PriceHistoryListTable
