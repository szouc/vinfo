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
          <Sider width={200} style={{ background: '#fff' }}>
            <BaseSider />
          </Sider>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Redirect to='/home' />
            <BaseContent />
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Vehicle Infomation ©2017 Created by szouc
        </Footer>
      </Layout>
    )
  }
}
export default BaseLayout
