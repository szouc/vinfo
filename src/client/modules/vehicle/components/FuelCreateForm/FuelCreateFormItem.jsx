import React from 'react'
import { Field } from 'redux-form/es/immutable'
import { Row, Col, Button } from 'antd'
import { Input } from '@clientModulesShared/forms'
import { v4 } from 'uuid/v4'

export default class FuelCreateFormItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  removeItemByIndex = () => this.props.removeItem(this.props.index)

  render() {
    const { fuels, index } = this.props
    return (
      <li key={v4()}>
        <Row type='flex' justify='space-between' align='top'>
          <Col span={4}>
            <h4>加油记录 #{index + 1}</h4>
          </Col>
          <Col span={4}>
            <Field
              name={`${fuels}.litre`}
              component={Input}
              placeholder='加油升数'
              autoFocus
            />
          </Col>
          <Col span={4}>
            <Field name={`${fuels}.cost`} component={Input} placeholder='费用' />
          </Col>
          <Col span={4}>
            <Field
              name={`${fuels}.mile`}
              component={Input}
              placeholder='当前里程'
            />
          </Col>
          <Col span={4}>
            <Button type='danger' onClick={this.removeItemByIndex}>
              删除
            </Button>
          </Col>
        </Row>
      </li>
    )
  }
}
