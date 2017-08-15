import React from 'react'

import Layout from 'antd/es/layout'
import Menu from 'antd/es/menu'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import 'antd/es/layout/style/css'
import 'antd/es/menu/style/css'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'
import { Link } from 'react-router-dom'

const { Header } = Layout

const authHeader = () => {
  return (
    <Row>
      <Header className='header'>
        <Col span={8}>
          <div className='logo' />
        </Col>
        <Col span={8} offset={8}>
          <Row type='flex' justify='end'>
            <Menu
              theme='dark'
              mode='horizontal'
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='signup'>
                <Link to='/logout'>
                  注册
                </Link>
              </Menu.Item>
              <Menu.Item key='signin'>
                <Link to='/login'>
                  登录
                </Link>
              </Menu.Item>
            </Menu>
          </Row>
        </Col>
      </Header>
    </Row>
  )
}

export default authHeader
