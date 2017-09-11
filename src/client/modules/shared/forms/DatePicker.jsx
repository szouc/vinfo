import formItemHOC from '@clientModulesShared/formItemHOC'
import moment from 'moment'

import { DatePicker } from 'antd'

const AntDatePicker = formItemHOC(DatePicker, {
  format: 'LL',
  showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
})
export default AntDatePicker
