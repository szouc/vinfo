import { Menu, Icon } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

class BaseSider extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: '1'
    }
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        mode='inline'
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='user' />信息管理
            </span>
          }
        >
          <Menu.Item key='1'>
            <Link to='/company'>公司管理</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/product'>产品管理</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/user'>人员管理</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/vehicle'>车辆管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='laptop' />提交数据
            </span>
          }
        >
          <Menu.Item key='5'>
            <Link to='/fuel'>加油记录</Link>
          </Menu.Item>
          <Menu.Item key='6'>维修记录</Menu.Item>
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
    )
  }
}

export default BaseSider
