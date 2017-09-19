import React from 'react'

import { UserCreateForm } from '@clientModules/user/containers'
import LicenseUpload from '@clientModules/user/components/LicenseUpload'

import { Row } from 'antd'

const User = () => {
  return (
    <div>
      <Row type='flex' justify='center'>
        <UserCreateForm />
      </Row>
      <Row>
        <LicenseUpload />
      </Row>
    </div>
  )
}

export default User
