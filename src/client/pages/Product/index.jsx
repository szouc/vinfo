import React from 'react'
import {
  ProductCreateForm,
  ProductListTable
} from '@clientModules/product/containers'
import { Row } from 'antd'

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
