import React from 'react'
import { Upload, message, Icon, Modal } from 'antd'
import './style.css'

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJPG) {
    message.error('只能上传 JPG/PNG 文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('上传文件必须小于 2MB!')
  }
  return isJPG && isLt2M
}

/**
 * A component controlling the upload field
 * @param {String} placeholder to show the upload label
 * @param {String} name the field name
 * @param {String} uploadUrl the upload server url
 * @param {Number} numberOfImage the number of the upload images
 * @class LicenseUpload
 * @extends {React.Component}
 */
class ImageUpload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.uploadProps = {
      name: this.props.name,
      data: file => {
        var formData = new FormData()
        formData.append(this.props.name, file, file[name])
        return formData
      },
      action: this.props.uploadUrl,
      withCredentials: true,
      listType: 'picture-card'
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

  handleChange = info => {
    this.props.onChange(info.file.response)
    // if (info.file.status !== 'uploading') {
    // console.log(info.file, info.fileList)
    // }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功。`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败。`)
    }
    this.setState({ fileList: info.fileList })
  }

  render() {
    const { placeholder, numberOfImage, ...rest } = this.props
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
          fileList={fileList}
          beforeUpload={beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= numberOfImage ? null : uploadButton}
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

export default ImageUpload
