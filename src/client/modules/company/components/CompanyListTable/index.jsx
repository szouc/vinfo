import React from 'react'
import BaseComponent from '@clientModulesShared/BaseComponent'
import CompanyTable from './CompanyTable'

class CompanyListTable extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCompanies()
  }

  render() {
    const { companies, deleteCompanyById } = this.props
    return (
      <CompanyTable
        companies={companies}
        deleteCompanyById={deleteCompanyById}
      />
    )
  }
}

export default CompanyListTable
