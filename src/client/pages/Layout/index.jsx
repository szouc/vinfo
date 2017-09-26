import { Layout, Menu, Icon } from 'antd'
import React from 'react'
import Header from '@clientModules/auth/containers/Header'
import { Route, Switch, Link } from 'react-router-dom'
// import Carousel from '../Carousel'
import Company from '../Company'
import Product from '../Product'
import User from '../User'
import Vehicle from '../Vehicle'
import Fuel from '../Fuel'
import NotFound from '../NotFound'

const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const baseLayout = ({ match }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key='sub1'
              title={
                <span>
                  <Icon type='user' />信息管理
                </span>
              }
            >
              <Menu.Item key='1'><Link to={`${match.url}/company`}>公司管理</Link></Menu.Item>
              <Menu.Item key='2'><Link to={`${match.url}/product`}>产品管理</Link></Menu.Item>
              <Menu.Item key='3'><Link to={`${match.url}/user`}>人员管理</Link></Menu.Item>
              <Menu.Item key='4'><Link to={`${match.url}/vehicle`}>车辆管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={
                <span>
                  <Icon type='laptop' />subnav 2
                </span>
              }
            >
              <Menu.Item key='5'>option5</Menu.Item>
              <Menu.Item key='6'>option6</Menu.Item>
              <Menu.Item key='7'>option7</Menu.Item>
              <Menu.Item key='8'>option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub3'
              title={
                <span>
                  <Icon type='notification' />subnav 3
                </span>
              }
            >
              <Menu.Item key='9'>option9</Menu.Item>
              <Menu.Item key='10'>option10</Menu.Item>
              <Menu.Item key='11'>option11</Menu.Item>
              <Menu.Item key='12'>option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Switch>
            <Route exact path={match.url} render={() => <Fuel />} />
            <Route exact path={`${match.url}/company`} render={() => <Company />} />
            <Route exact path={`${match.url}/vehicle`} render={() => <Vehicle />} />
            <Route exact path={`${match.url}/user`} render={() => <User />} />
            <Route exact path={`${match.url}/product`} render={() => <Product />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Vehicle Infomation ©2017 Created by szouc
      </Footer>
    </Layout>
  )
}

export default baseLayout
