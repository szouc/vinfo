import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import addHostAddr from '@clientUtils/addHostAddr'
import moment from 'moment'
import { Table, Button } from 'antd'

class UserListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const { users, deleteUserById } = this.props
    const data = users
    const columns = [
      {
        title: '工号',
        key: 'username',
        render: (text, record) => record.username
      },
      {
        title: '',
        key: 'fullname',
        render: (text, record) => record.fullname
      },
      {
        title: '',
        key: 'gender',
        render: (text, record) => record.gender
      },
      {
        title: '',
        key: 'role',
        render: (text, record) => record.role
      },
      {
        title: '',
        key: 'license',
        render: (text, record) => <img src={addHostAddr(record.license)} />
      },
      {
        title: '',
        key: 'id_front',
        render: (text, record) => <img src={addHostAddr(record.id_front)} />
      },
      {
        title: '',
        key: 'id_back',
        render: (text, record) => <img src={addHostAddr(record.id_back)} />
      },
      {
        title: '',
        key: 'cert',
        render: (text, record) => record.cert
      },
      {
        title: '',
        key: 'cert_expired',
        render: (text, record) => moment(record.cert_expired)
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type='danger'
              size='small'
              onClick={deleteUserById(record._id)}
            >
              删除
            </Button>
          </span>
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

export default UserListTable
