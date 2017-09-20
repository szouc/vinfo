import React from 'react'
import { Modal, Button } from 'antd'

import BaseComponent from '@clientModulesShared/BaseComponent'
import './style.css'

export default class ImageModal extends BaseComponent {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { imageUrl } = this.props
    return (
      <div>
        <Button size='small' onClick={this.showModal}>
          查看图片
        </Button>
        <Modal
          wrapClassName='vertical-center-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <img width={416} src={imageUrl} />
        </Modal>
      </div>
    )
  }
}
