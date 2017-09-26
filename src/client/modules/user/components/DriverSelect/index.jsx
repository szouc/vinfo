import React from 'react'
import { Select } from 'antd'
import './style.css'

const Option = Select.Option

class DriverSelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    placeholder: '请选择司机'
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const { drivers, placeholder, ...rest } = this.props
    const options = drivers
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

export default DriverSelect
