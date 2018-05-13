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
    this.props.getVehicles(1, 2)
  }

  render() {
    const { vehicles, pagination, getVehicles, deleteVehicleById } = this.props
    const { pageNumber, ...rest } = pagination
    const newPag = { current: pageNumber, onChange: getVehicles, ...rest }
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
        key: 'purchaseDate',
        render: (text, record) =>
          record.purchaseDate
            ? moment(record.purchaseDate).format('LL')
            : record.purchaseDate
      },
      {
        title: '初始里程',
        key: 'initMile',
        render: (text, record) => record.initMile
      },
      {
        title: '所属队长',
        key: 'captain',
        render: (text, record) => record.captainName
      },
      {
        title: '第一司机',
        key: 'principal',
        render: (text, record) => record.principalName
      },
      {
        title: '第二司机',
        key: 'secondary',
        render: (text, record) => record.secondaryName
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <VehicleUpdateFormModal vehicle={record} />
            <span className='ant-divider' />
            <Popconfirm
              title='确认删除？'
              onConfirm={deleteVehicleById(record._id)}
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
        dataSource={data}
        pagination={newPag}
        rowKey={record => record._id}
      />
    )
  }
}

export default VehicleListTable
