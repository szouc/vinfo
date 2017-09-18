import React from 'react'

import { UserCreateForm } from '@clientModules/user/containers'

import { Row } from 'antd'

const User = () => {
  return (
    <div>
      <Row type='flex' justify='center'>
        <UserCreateForm />
      </Row>
    </div>
  )
}

export default User
