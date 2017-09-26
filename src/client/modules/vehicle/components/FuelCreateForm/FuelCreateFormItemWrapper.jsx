import React from 'react'
import { Button } from 'antd'
import Immutable from 'immutable'
import FuelCreateFormItem from './FuelCreateFormItem'

export default class FuelCreateFormItemWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  pushItem = () => this.props.fields.push(Immutable.Map({}))
  removeItem = index => this.props.fields.remove(index)

  render() {
    const { fields } = this.props
    return (
      <ul>
        <Button type='primary' onClick={this.pushItem}>
          添加加油记录
        </Button>
        {fields.map((fuels, index) => (
          <FuelCreateFormItem
            fuels={fuels}
            index={index}
            removeItem={this.removeItem}
          />
        ))}
      </ul>
    )
  }
}
