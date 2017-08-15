import 'antd/es/select/style/css'

import { SelectField } from './MultiSelect'
import createComponent from '../createComponent'
import mapError from '../mapError'

const mapProps = (props) => {
  let { input: { value } } = props
  const customProps = {
    dropdownMatchSelectWidth: true,
    value,
    style: { minWidth: 200 }
  }
  return ({
    ...mapError(props),
    ...customProps
  })
}

export default createComponent(SelectField, mapProps)
