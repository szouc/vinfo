import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

class VehicleSelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    placeholder: '请选择车辆'
  }

  componentDidMount() {
    this.props.getAllVehicles()
  }

  render() {
    const { vehicles, placeholder, ...rest } = this.props
    const options = vehicles || []
    const optionsList = options.map(vehicle => {
      return (
        <Option key={vehicle._id} value={vehicle._id}>
          {vehicle.plate}
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

export default VehicleSelect
