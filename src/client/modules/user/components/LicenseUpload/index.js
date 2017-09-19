import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import BaseComponent from '@clientModulesShared/BaseComponent'

class LicenseUpload extends BaseComponent {
  constructor(props) {
    super(props)
    this.uploadProps = {
      name: 'file',
      data: file => {
        var formData = new FormData()
        for (var name in file) {
          formData.append(name, file[name])
        }
        return formData
      },
      action: '//127.0.0.1:8000/api/user/license',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
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
    return (
      <Upload {...this.uploadProps} {...this.props}>
        <Button>
          <Icon type='upload' /> Click to Upload
        </Button>
      </Upload>
    )
  }
}

export default LicenseUpload
