import React from 'react'
import { Modal, Button } from 'antd'
import UserUpdateFormCreator from '../../containers/UserUpdateFormCreator'

import BaseComponent from '@clientModulesShared/BaseComponent'
import './style.css'

export default class UserUpdateFormModal extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

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
    const { user } = this.props
    const UserUpdateForm = UserUpdateFormCreator(user.username)
    return (
      <div>
        <Button onClick={this.showModal}>更新</Button>
        <Modal
          wrapClassName='vertical-center-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <UserUpdateForm user={user} />
        </Modal>
      </div>
    )
  }
}
