import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import Table from 'antd/es/table'
import 'antd/es/table/style/css'
import { Input } from '../../modules/shared/forms'

const CompanyTable = props => {
  // const { handleSubmit, load, pristine, reset, submitting } = props
  const { handleSubmit } = props

  const renderField = (text, record) => {
    if (record.editing) {
      return <Field name={text} component={Input} placeholder={text} />
    }
    return (
      <div>
        {text}
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: renderField
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) =>
        <span>
          <a href='#'>
            Action 一 {record.name}
          </a>
          <span className='ant-divider' />
          <a href='#'>Delete</a>
        </span>
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      editing: false,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      editing: true,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      editing: false,
      address: 'Sidney No. 1 Lake Park'
    }
  ]
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </form>
  )
}

const CompanyTableForm = reduxForm({
  form: 'companyTableForm'
})(CompanyTable)

export default CompanyTableForm
