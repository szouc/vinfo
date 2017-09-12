import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import { Select } from 'antd'

const Option = Select.Option

class ProductSelect extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const { products, ...rest } = this.props
    const options = products
    const optionsList = options.map(product => (
      <Option value={product._id}>
        {product.name}({product.specs})
      </Option>
    ))

    return (
      <Select style={{ width: '100%' }} {...rest}>
        {optionsList}
      </Select>
    )
  }
}

export default ProductSelect
