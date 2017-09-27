import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import addHostAddr from '@clientUtils/addHostAddr'
import moment from 'moment'
import { Table, Button, Popconfirm } from 'antd'
import ImageModal from '../ImageModal'
import { roleMapper, genderMapper } from '../constants'
import UserUpdateFormModal from '../UserUpdateFormModal'

class UserListTable extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const { users, deleteUserByUsername } = this.props
    const data = users
    const columns = [
      {
        title: '工号',
        key: 'username',
        render: (text, record) => record.username
      },
      {
        title: '姓名',
        key: 'fullname',
        render: (text, record) => record.fullname
      },
      {
        title: '性别',
        key: 'gender',
        render: (text, record) => genderMapper[record.gender]
      },
      {
        title: '权限',
        key: 'role',
        render: (text, record) => roleMapper[record.role]
      },
      {
        title: '身份证正面',
        key: 'id_front',
        render: (text, record) => {
          if (record.id_front) {
            return <ImageModal imageUrl={addHostAddr(record.id_front)} />
          } else {
            return record.id_front
          }
        }
      },
      {
        title: '身份证反面',
        key: 'id_back',
        render: (text, record) => {
          if (record.id_back) {
            return <ImageModal imageUrl={addHostAddr(record.id_back)} />
          } else {
            return record.idback_
          }
        }
      },
      {
        title: '驾驶证',
        key: 'license',
        render: (text, record) => {
          if (record.license) {
            return <ImageModal imageUrl={addHostAddr(record.license)} />
          } else {
            return record.license
          }
        }
      },
      {
        title: '运输证号',
        key: 'cert',
        render: (text, record) => record.cert
      },
      {
        title: '运输证到期日期',
        key: 'cert_expired',
        render: (text, record) => {
          if (record.cert_expired) {
            return moment(record.cert_expired).format('LL')
          } else {
            return record.cert_expired
          }
        }
      },
      {
        title: '相关操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <UserUpdateFormModal user={record} />
            <span className='ant-divider' />
            <Popconfirm
              title='确认删除？'
              onConfirm={deleteUserByUsername(record.username)}
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
        rowKey={record => record.username}
      />
    )
  }
}

export default UserListTable
