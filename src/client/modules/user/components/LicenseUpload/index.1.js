import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import BaseComponent from '@clientModulesShared/BaseComponent'

class LicenseUpload extends BaseComponent {
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
      withCredentials: true,
      listType: 'picture',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
  }

  render() {
    const { placeholder } = this.props
    return (
      <Upload {...this.uploadProps} {...this.props}>
        <Button>
          <Icon type='upload' /> {placeholder}
        </Button>
      </Upload>
    )
  }
}

export default LicenseUpload
