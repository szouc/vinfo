import formItemHOC from '@clientModulesShared/formItemHOC'
import moment from 'moment'

import { DatePicker } from 'antd'

const AntDatePicker = formItemHOC(DatePicker, {
  showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
  format: 'LL'
})
export default AntDatePicker
