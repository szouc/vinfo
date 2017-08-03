// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'
import Menu from 'antd/lib/menu'
// import 'antd/lib/menu/style/index.css'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
  USER_REGISTER_ROUTE,
  USER_LOGIN_ROUTE
} from '../../shared/routes'

const Nav = () =>
  <Menu mode='vertical'>
    {[
      { route: HOME_PAGE_ROUTE, label: 'Home' },
      { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
      { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
      { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
      { route: USER_REGISTER_ROUTE, label: 'register' },
      { route: USER_LOGIN_ROUTE, label: 'login' }
    ].map(link => (
      <Menu.Item key={link.route}>
        <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>{link.label}</NavLink>
      </Menu.Item>
    ))}
  </Menu>

export default Nav
