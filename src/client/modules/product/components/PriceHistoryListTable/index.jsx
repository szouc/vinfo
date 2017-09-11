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
    const data = product.get('price_history').toArray()
    const columns = [
      {
        title: '开始日期',
        key: 'name',
        render: (text, record) => moment(record.get('start')).format('LL')
      },
      {
        title: '结束日期',
        key: 'specs',
        render: (text, record) => moment(record.get('end')).format('LL')
      },
      {
        title: '价格',
        key: 'price',
        render: (text, record) => record.get('price')
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              size='small'
              onClick={() =>
                deletePriceHistoryById(product.get('_id'), record.get('_id'))}
            >
              删除
            </Button>
          </span>
        )
      }
    ]

    const ProductUpdateFormById = ProductUpdateFormCreator(product.get('_id'))
    const PriceHistoryCreateFormById = PriceHistoryCreateFormCreator(product.get('_id'))

    return (
      <div>
        <ProductUpdateFormById product={product} />
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.get('_id')}
          pagination={false}
        />
        <PriceHistoryCreateFormById product={product} />
      </div>
    )
  }
}

export default PriceHistoryListTable
