import React from 'react'
import {
  ProductCreateForm,
  ProductListTable
} from '@clientModules/product/containers'
import { Row } from 'antd'

class Product extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Row>
          <ProductCreateForm />
        </Row>
        <Row
          style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
        >
          <ProductListTable />
        </Row>
      </div>
    )
  }
}

export default Product
