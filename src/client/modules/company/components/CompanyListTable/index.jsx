import React, { PureComponent } from 'react'
import CompanyTable from './CompanyTable'

class CompanyListTable extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCompanies()
  }

  render() {
    const {
      companies,
      pagination,
      getCompanies,
      deleteCompanyById
    } = this.props
    const { pageNumber, ...rest } = pagination
    const newPag = { current: pageNumber, onChange: getCompanies, ...rest }
    return (
      <CompanyTable
        companies={companies}
        deleteCompanyById={deleteCompanyById}
        pagination={newPag}
      />
    )
  }
}

export default CompanyListTable
