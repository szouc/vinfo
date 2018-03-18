import React from 'react'
import ProductTable from './ProductTable'

class ProductListTable extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts(1, 2)
  }

  render() {
    const {
      products,
      pagination,
      getProducts,
      deleteProductById,
      deletePriceHistoryById
    } = this.props
    const { pageNumber, ...rest } = pagination
    const newPag = { current: pageNumber, onChange: getProducts, ...rest }
    return (
      <ProductTable
        products={products}
        deleteProductById={deleteProductById}
        deletePriceHistoryById={deletePriceHistoryById}
        pagination={newPag}
      />
    )
  }
}

export default ProductListTable
