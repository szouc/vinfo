import formItemHOC from '@clientModulesShared/formItemHOC'

import { DatePicker } from 'antd'

const { RangePicker } = DatePicker
const AntRangePicker = formItemHOC(RangePicker)

export default AntRangePicker
