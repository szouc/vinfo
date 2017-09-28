import React from 'react'

import { UserCreateForm, UserListTable } from '@clientModules/user/containers'

import { Row } from 'antd'

class User extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Row type='flex' justify='center'>
          <UserCreateForm />
        </Row>
        <Row
          style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
        >
          <UserListTable />
        </Row>
      </div>
    )
  }
}

export default User
