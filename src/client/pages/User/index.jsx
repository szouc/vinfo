import React from 'react'

import { UserCreateForm, UserListTable } from '@clientModules/user/containers'

import { Row } from 'antd'

const User = () => {
  return (
    <div>
      <Row type='flex' justify='space-around'>
        <UserCreateForm />
      </Row>
      <Row type='flex' justify='space-around'>
        <UserListTable />
      </Row>
    </div>
  )
}

export default User
