import { Layout } from 'antd'
import React from 'react'
import BaseHeader from '@clientModules/auth/containers/Header'
import BaseSider from '../Sider'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Carousel from '../Carousel'
import Company from '../Company'
import Product from '../Product'
import User from '../User'
import Vehicle from '../Vehicle'
import Fuel from '../Fuel'
import NotFound from '../NotFound'

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
            <Switch>
              <Route exact path='/home' component={Fuel} />
              <Route exact path='/company' component={Company} />
              <Route exact path='/vehicle' component={Vehicle} />
              <Route exact path='/user' component={User} />
              <Route exact path='/product' component={Product} />
              <Route component={NotFound} />
            </Switch>
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
