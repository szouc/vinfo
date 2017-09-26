import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import { fromJS } from 'immutable'
import FieldItem from './FieldItem'
import { v4 } from 'node-uuid'

import { Button } from 'antd'

class PriceHistoryCreateField extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  pushItem = () => this.props.fields.push(fromJS({}))
  removeItem = index => this.props.fields.remove(index)

  render() {
    const { fields } = this.props
    return (
      <ul>
        <li key={v4()}>
          <Button type='primary' onClick={this.pushItem}>
            添加历史价格
          </Button>
        </li>
        {fields.map((priceHistory, index) => (
          <FieldItem
            removeItem={this.removeItem}
            priceHistory={priceHistory}
            index={index}
          />
        ))}
      </ul>
    )
  }
}

export default PriceHistoryCreateField
