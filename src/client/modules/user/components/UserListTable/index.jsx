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
    this.props.getUsers(1, 2)
  }

  render() {
    const { users, pagination, getUsers, deleteUserByUsername } = this.props
    const { pageNumber, ...rest } = pagination
    const newPag = { current: pageNumber, onChange: getUsers, ...rest }
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
        key: 'idFront',
        render: (text, record) => {
          if (record.detail && record.detail.idFront) {
            return <ImageModal imageUrl={addHostAddr(record.detail.idFront)} />
          } else {
            return null
          }
        }
      },
      {
        title: '身份证反面',
        key: 'idBack',
        render: (text, record) => {
          if (record.detail && record.detail.idBack) {
            return <ImageModal imageUrl={addHostAddr(record.detail.idBack)} />
          } else {
            return null
          }
        }
      },
      {
        title: '驾驶证',
        key: 'license',
        render: (text, record) => {
          if (record.detail && record.detail.license) {
            return <ImageModal imageUrl={addHostAddr(record.detail.license)} />
          } else {
            return null
          }
        }
      },
      {
        title: '运输证号',
        key: 'cert',
        render: (text, record) => record.detail && record.detail.cert
      },
      {
        title: '运输证到期日期',
        key: 'certExpired',
        render: (text, record) => {
          if (record.detail && record.detail.certExpired) {
            return moment(record.detail.certExpired).format('LL')
          } else {
            return null
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
        pagination={newPag}
      />
    )
  }
}

export default UserListTable
