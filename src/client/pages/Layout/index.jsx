import React from 'react'
import BaseHeader from '@clientModules/auth/containers/Header'
import BaseSider from '../Sider'
import BaseContent from '../Content'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Sider, Content, Footer } = Layout

class BaseLayout extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    console.log('create')
  }

  render() {
    return (
      <Layout>
        <Header>
          <BaseHeader />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ overflow: 'auto', height: '100vh', position: 'fixed' }}
          >
            <BaseSider />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                minHeight: 280
              }}
            >
              <Redirect to='/home' />
              <BaseContent />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Vehicle Infomation ©2018 Created by szouc
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default BaseLayout
