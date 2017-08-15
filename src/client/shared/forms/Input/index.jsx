import 'antd/es/input/style/css'

import Input from 'antd/es/input'
import createComponent from '../createComponent'
import mapError from '../mapError'

const mapProps = (props) => {
  return ({
    ...mapError(props)
  })
}

export default createComponent(Input, mapProps)
