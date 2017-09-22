import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'

import { Layout, Menu, Row, Col, Dropdown, Icon, Avatar } from 'antd'

const { Header } = Layout

class AuthHeader extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { user, handleLogout } = this.props
    const userMenu = (
      <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
        <Menu.Item key='username' disabled>
          {user.get('username')}
        </Menu.Item>
        <Menu.Item key='profile'>
          <a onClick={handleLogout}>详细信息</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={handleLogout}>注销</a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Header>
        <Row type='flex' justify='space-around'>
          <Col span={18} offset={3}>
            <div className='logo'>Company LOGO</div>
          </Col>
          <Col span={3}>
            <Dropdown overlay={userMenu}>
              <a className='ant-dropdown-link' href='#'>
                <Avatar
                  style={{
                    verticalAlign: 'middle',
                    backgroundColor: '#7265e6'
                  }}
                  icon='user'
                />{' '}
                <Icon type='down' />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default AuthHeader
