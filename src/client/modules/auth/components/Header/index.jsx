import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'

import Layout from 'antd/es/layout'
import Menu from 'antd/es/menu'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Dropdown from 'antd/es/dropdown'
import Icon from 'antd/es/icon'
import Avatar from 'antd/es/avatar'
import 'antd/es/layout/style/css'
import 'antd/es/icon/style/css'
import 'antd/es/avatar/style/css'
import 'antd/es/dropdown/style/css'
import 'antd/es/menu/style/css'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'

const { Header } = Layout

class AuthHeader extends BaseComponent {
  constructor (props) {
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
        <Row type='flex' justify='end'>
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
