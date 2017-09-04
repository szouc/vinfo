import 'antd/es/layout/style/css'

import Layout from 'antd/es/layout'
import React from 'react'
import Header from '../../modules/auth/containers/Header'
import { Route, Switch } from 'react-router-dom'
// import Carousel from '../Carousel'
import Company from '../Company'
import NotFound from '../NotFound'

const { Content, Footer } = Layout

const baseLayout = ({ match }) => {
  return (
    <Layout>
      <Header />
      <Content>
        <Switch>
          <Route exact path={match.url} render={() => <Company />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Vehicle Infomation ©2017 Created by szouc
      </Footer>
    </Layout>
  )
}

export default baseLayout
