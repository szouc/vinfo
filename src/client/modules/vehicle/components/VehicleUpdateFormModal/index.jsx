import React from 'react'
import { Modal, Button } from 'antd'
import VehicleUpdateFormCreator from '../../containers/VehicleUpdateFormCreator'

import './style.css'

export default class UserUpdateFormModal extends React.PureComponent {
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
    const { vehicle } = this.props
    const VehicleUpdateForm = VehicleUpdateFormCreator(vehicle._id)
    return (
      <div>
        <Button type='primary' size='small' onClick={this.showModal}>更新</Button>
        <Modal
          wrapClassName='vertical-center-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <VehicleUpdateForm vehicle={vehicle} />
        </Modal>
      </div>
    )
  }
}
