import { connect } from 'react-redux'

import TransportCreateForm from '../components/TransportCreateForm'
import { createTransportRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'
import { fromJS } from 'immutable'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      const assigner = {}
      if (values.get('assigner')) {
        assigner.username = values.get('assigner').split('@@')[0]
        assigner.fullname = values.get('assigner').split('@@')[1]
      }
      const vehicle = {}
      if (values.get('vehicle')) {
        vehicle._id = values.get('vehicle').split('@@')[0]
        vehicle.plate = values.get('vehicle').split('@@')[1]
        vehicle.engine = values.get('vehicle').split('@@')[2]
      }
      const fromCompany = {}
      if (values.getIn(['from', 'company'])) {
        fromCompany._id = values.getIn(['from', 'company']).split('@@')[0]
        fromCompany.name = values.getIn(['from', 'company']).split('@@')[1]
        fromCompany.addr = values.getIn(['from', 'company']).split('@@')[2]
      }
      const toCompany = {}
      if (values.getIn(['to', 'company'])) {
        toCompany._id = values.getIn(['to', 'company']).split('@@')[0]
        toCompany.name = values.getIn(['to', 'company']).split('@@')[1]
        toCompany.addr = values.getIn(['to', 'company']).split('@@')[2]
      }
      const product = {}
      if (values.get('product')) {
        product._id = values.get('product').split('@@')[0]
        product.name = values.get('product').split('@@')[1]
        product.specs = values.get('product').split('@@')[2]
      }
      const req = values
        .set('assigner', fromJS(assigner))
        .set('vehicle', fromJS(vehicle))
        .setIn(['from', 'company'], fromJS(fromCompany))
        .setIn(['to', 'company'], fromJS(toCompany))
        .set('product', fromJS(product))
      dispatch(createTransportRequest(req))
    }
  }
}

export default connect(null, mapDispatchToProps)(
  immutPropsToJS(TransportCreateForm)
)
