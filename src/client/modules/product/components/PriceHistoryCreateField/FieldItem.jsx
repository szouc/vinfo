import React from 'react'
import { v4 } from 'node-uuid'
import BaseComponent from '@clientModulesShared/BaseComponent'
import { Field } from 'redux-form/es/immutable'

import { Button, Row, Col } from 'antd'
import InputNumber from '@clientModulesShared/forms/InputNumber'
import DatePicker from '@clientModulesShared/forms/DatePicker'

class PriceHistoryCreateFieldItem extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { removeItem, priceHistory, index } = this.props
    return (
      <Row>
        <li key={v4()}>
          <Col span={4}>
            <h4>
              历史价格 #{index + 1}
            </h4>
          </Col>
          <Col span={6}>
            <Field
              name={`${priceHistory}.start`}
              component={DatePicker}
              placeholder='开始日期'
            />
          </Col>
          <Col span={6}>
            <Field
              name={`${priceHistory}.end`}
              component={DatePicker}
              placeholder='结束日期'
            />
          </Col>
          <Col span={4}>
            <Field
              name={`${priceHistory}.price`}
              component={InputNumber}
              placeholder='物品价格'
              autoFocus
            />
          </Col>
          <Col span={4}>
            <Button type='danger' onClick={removeItem(index)}>
              删除
            </Button>
          </Col>
        </li>
      </Row>
    )
  }
}

export default PriceHistoryCreateFieldItem
