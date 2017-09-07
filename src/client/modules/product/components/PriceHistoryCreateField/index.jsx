import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import { Field } from 'redux-form/es/immutable'
import { fromJS } from 'immutable'

import Button from 'antd/es/button'
import 'antd/es/button/style/css'
import Input from '@clientModulesShared/forms/Input'
import RangePicker from '@clientModulesShared/forms/RangePicker'

class PriceHistoryCreateField extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { fields } = this.props
    return (
      <ul>
        <li>
          <Button onClick={() => fields.push(fromJS({}))}>添加历史价格</Button>
        </li>
        {fields.map((priceHistory, index) =>
          <li key={index}>
            <Button
              type='danger'
              onClick={() => fields.remove(index)}
            >
              删除
            </Button>
            <h4>
              历史价格 #{index + 1}
            </h4>
            <Field
              name={`${priceHistory}.date`}
              component={RangePicker}
              label='日期时段'
            />
            <Field
              name={`${priceHistory}.price`}
              component={Input}
              label='物品价格'
            />
          </li>
        )}
      </ul>
    )
  }
}

export default PriceHistoryCreateField
