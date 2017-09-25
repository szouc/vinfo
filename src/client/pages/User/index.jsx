import React from 'react'

import { UserCreateForm, UserListTable, DriverSelect } from '@clientModules/user/containers'

import { Row } from 'antd'

const User = () => {
  return (
    <div>
      <Row type='flex' justify='center'>
        <UserCreateForm />
      </Row>
      <Row type='flex' justify='center'>
        <UserListTable />
      </Row>
    </div>
  )
}

export default User
