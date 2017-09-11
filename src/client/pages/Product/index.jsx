import React from 'react'
import {
  ProductCreateForm,
  ProductListTable
} from '@clientModules/product/containers'
import { Row } from 'antd'
// import Col from 'antd/es/col'

const Product = () => {
  return (
    <div>
      <Row>
        <ProductCreateForm />
      </Row>
      <Row>
        <ProductListTable />
      </Row>
    </div>
  )
}

export default Product
