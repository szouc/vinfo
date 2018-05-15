import React from 'react'
import { Modal, Button } from 'antd'
import VehicleUpdateFormCreator from '../../containers/VehicleUpdateFormCreator'

import './style.css'

export default class UserUpdateFormModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.VehicleUpdateForm = VehicleUpdateFormCreator(props.vehicle._id)
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
    const { vehicle } = this.props
    return (
      <span>
        <Button type='primary' size='small' onClick={this.showModal}>更新</Button>
        <Modal
          wrapClassName='vertical-center-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.state.visible ? <this.VehicleUpdateForm vehicle={vehicle} /> : null}
        </Modal>
      </span>
    )
  }
}
