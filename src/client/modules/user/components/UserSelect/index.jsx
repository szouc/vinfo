import React from 'react'
import { Select } from 'antd'
import './style.css'

const Option = Select.Option

class UserSelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    placeholder: '请选择人员'
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const { users, placeholder, ...rest } = this.props
    const options = users
    const optionsList = options.map(user => {
      return (
        <Option key={user.username} value={`${user.username}@@${user.fullname}`}>
          {user.fullname}({user.username})
        </Option>
      )
    })

    return (
      <Select {...rest}>
        <Option value='' className='first-option' disabled>
          {placeholder}
        </Option>
        {optionsList}
      </Select>
    )
  }
}

export default UserSelect
