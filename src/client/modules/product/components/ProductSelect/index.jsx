import React from 'react'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import { Select } from 'antd'

const Option = Select.Option

class ProductSelect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    placeholder: '请选择产品'
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const { products, placeholder, ...rest } = this.props
    const options = products
    const optionsList = options.map(product => (
      <Option key={product._id} value={`${product._id}@@${product.name}@@${product.specs}`}>
        {product.name}({product.specs})
      </Option>
    ))

    return (
      <Select style={{ width: '100%' }} {...rest}>
        <Option value='' className='first-option' disabled>
          {placeholder}
        </Option>
        {optionsList}
      </Select>
    )
  }
}

export default ProductSelect
