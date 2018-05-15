import React from 'react'
import moment from 'moment'

import { Table, Button, Popconfirm } from 'antd'
import PriceHistoryCreateFormCreator from '../../containers/PriceHistoryCreateFormCreator'
import ProductUpdateFormCreator from '../../containers/ProductUpdateFormCreator'

class PriceHistoryListTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.ProductUpdateFormById = ProductUpdateFormCreator(props.product._id)
    this.PriceHistoryCreateFormById = PriceHistoryCreateFormCreator(
      props.product._id
    )
  }

  render() {
    const { product, priceHistories, deletePriceHistoryById } = this.props
    const data = priceHistories
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
            <span className='ant-divider' />
            <Popconfirm
              title='确认删除？'
              onConfirm={deletePriceHistoryById(product._id, record._id)}
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
      <div>
        <this.ProductUpdateFormById product={product} />
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record._id}
          pagination={false}
        />
        <this.PriceHistoryCreateFormById product={product} />
      </div>
    )
  }
}

export default PriceHistoryListTable
