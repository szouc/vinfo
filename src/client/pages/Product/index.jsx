import React from 'react'
import {
  ProductCreateForm
} from '@clientModules/product/containers'
import Row from 'antd/es/row'
// import Col from 'antd/es/col'
import 'antd/es/row/style/css'
// import 'antd/es/col/style/css'

const Product = () => {
  return (
    <div>
      <Row>
        <ProductCreateForm />
      </Row>
    </div>
  )
}

export default Product
