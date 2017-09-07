import formItemHOC from '@clientModulesShared/formItemHOC'

import DatePicker from 'antd/es/date-picker'
import 'antd/es/date-picker/style/css'

const { RangePicker } = DatePicker
const AntRangePicker = formItemHOC(RangePicker)

export default AntRangePicker
