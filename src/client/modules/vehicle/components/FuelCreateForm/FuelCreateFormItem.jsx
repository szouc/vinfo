import React from 'react'
import { Field } from 'redux-form/es/immutable'
import { Row, Col, Button } from 'antd'
import { Input } from '@clientModulesShared/forms'
import { v4 } from 'node-uuid'
import Immutable from 'immutable'

export default class FuelCreateFormItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  pushItem = () => this.props.fields.push(Immutable.Map({}))
  removeItem = index => () => this.props.fields.remove(index)

  render() {
    const { fields } = this.props
    return (
      <ul>
        <Row>
          <li>
            <Button onClick={this.pushItem}>
              添加加油记录
            </Button>
          </li>
        </Row>
        {fields.map((fuelHistory, index) => (
          <Row>
            <li key={v4()}>
              <Col span={2}>
                <h4>加油记录 #{index + 1}</h4>
              </Col>
              <Col span={6}>
                <Field
                  name={`${fuelHistory}.litre`}
                  component={Input}
                  placeholder='加油升数'
                  autoFouce
                />
              </Col>
              <Col span={6}>
                <Field
                  name={`${fuelHistory}.cost`}
                  kcomponent={Input}
                  placeholder='费用'
                />
              </Col>
              <Col span={6}>
                <Field
                  name={`${fuelHistory}.mile`}
                  component={Input}
                  placeholder='当前里程'
                />
              </Col>
              <Col span={4}>
                <Button type='danger' onClick={this.removeItem}>
                  删除
                </Button>
              </Col>
            </li>
          </Row>
        ))}
      </ul>
    )
  }
}
