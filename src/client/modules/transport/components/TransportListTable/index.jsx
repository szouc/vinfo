import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import { Table, Button, Popconfirm } from 'antd'

class TransportListTable extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTransports()
  }

  render() {
    const { transports, deleteTransportById } = this.props
    const data = transports
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
          <Popconfirm title='确认删除？' onConfirm={deleteTransportById(record._id)}>
            <Button type='danger' size='small'>
              删除
            </Button>
          </Popconfirm>
        )
      }
    ]

    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record._id}
      />
    )
  }
}

export default TransportListTable
