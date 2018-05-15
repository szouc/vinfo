import React from 'react'
import { Modal, Button } from 'antd'
import UserUpdateFormCreator from '../../containers/UserUpdateFormCreator'

// import BaseComponent from '@clientModulesShared/BaseComponent'
import './style.css'

export default class UserUpdateFormModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.UserUpdateForm = UserUpdateFormCreator(props.user.username)
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
    return (
      <span>
        <Button type='primary' size='small' onClick={this.showModal}>
          更新
        </Button>
        <Modal
          wrapClassName='vertical-center-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.state.visible ? <this.UserUpdateForm user={user} /> : null}
        </Modal>
      </span>
    )
  }
}
