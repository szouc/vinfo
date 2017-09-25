import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import moment from 'moment'
import { Table, Button, Popconfirm } from 'antd'
import VehicleUpdateFormModal from '../VehicleUpdateFormModal'

class VehicleListTable extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllVehicles()
  }

  render() {
    const { vehicles, deleteVehicleById } = this.props
    const data = vehicles
    const columns = [
      {
        title: '车牌',
        key: 'plate',
        render: (text, record) => record.plate
      },
      {
        title: '发动机号',
        key: 'engine',
        render: (text, record) => record.engine
      },
      {
        title: '型号',
        key: 'model',
        render: (text, record) => record.model
      },
      {
        title: '购买日期',
        key: 'purchase_date',
        render: (text, record) =>
          record.purchase_date
            ? moment(record.purchase_date).format('LL')
            : record.purchase_date
      },
      {
        title: '初始里程',
        key: 'init_mile',
        render: (text, record) => record.init_mile
      },
      {
        title: '第一司机',
        key: 'principal',
        render: (text, record) =>
          record.principal
            ? `${record.principal.fullname}(${record.principal.username})`
            : record.principal
      },
      {
        title: '第二司机',
        key: 'secondary',
        render: (text, record) =>
          record.secondary
            ? `${record.secondary.fullname}(${record.secondary.username})`
            : record.secondary
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <VehicleUpdateFormModal vehicle={record} />
            <span className='ant-divider' />
            <Popconfirm title='确认删除？' onConfirm={deleteVehicleById(record._id)}>
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
        dataSource={data}
        rowKey={record => record._id}
        bordered
      />
    )
  }
}

export default VehicleListTable
