import Table from 'antd/es/table'
import Icon from 'antd/es/icon'
import 'antd/es/table/style/css'
import 'antd/es/icon/style/css'

const CompanyListTable = props => {
  const { data } = props
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text =>
        <a href='#'>
          {text}
        </a>
    },
    {
      title: 'Addr',
      dataIndex: 'addr',
      key: 'addr'
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
          <span className='ant-divider' />
          <a href='#' className='ant-dropdown-link'>
            More actions <Icon type='down' />
          </a>
        </span>
    }
  ]

  return <Table columns={columns} dataSource={data} />
}

export default CompanyListTable
