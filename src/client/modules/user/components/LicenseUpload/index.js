import React from 'react'
import { Upload, message, Button, Icon, Modal } from 'antd'
import './style.css'

class LicenseUpload extends React.Component {
  constructor(props) {
    super(props)
    this.uploadProps = {
      name: 'license',
      data: file => {
        var formData = new FormData()
        formData.append('license', file, file[name])
        return formData
      },
      action: '//127.0.0.1:8000/api/user/license',
      withCredentials: true
      // onChange(info) {
      //   if (info.file.status !== 'uploading') {
      //     console.log(info.file, info.fileList)
      //   }
      //   if (info.file.status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully`)
      //   } else if (info.file.status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`)
      //   }
      // }
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  // handleChange = ({ fileList }) => {
  //   this.props.onChange({ fileList })
  //   this.setState({ fileList })
  // }

  handleChange = info => {
    this.props.onChange(info)
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
    this.setState({ fileList: info.fileList })
  }

  render() {
    const { placeholder, ...rest } = this.props
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>{placeholder}</div>
      </div>
    )
    return (
      <div className='clearfix'>
        <Upload
          {...this.uploadProps}
          {...rest}
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default LicenseUpload
