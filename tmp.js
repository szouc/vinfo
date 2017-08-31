import Immutable, { fromJS } from 'immutable'
import moment from 'moment'
import { normalize, schema, denormalize } from 'normalizr'

const jsList = [1, 2, 3, 4]

const immList = Immutable.fromJS(jsList)

const result = immList.push(fromJS({ a: 1 }), fromJS({ B: 2 }))

const final = result.concat(fromJS([2, 9]))

console.log(result)
console.log(result.get(5).get('B'))
console.log(final)

const tmpObj1 = {
  id: '1',
  name: 'hl',
  addr: 'qd sb hl',
  active: true,
  createdAt: moment('2016-12-08', 'YYYY-MM-DD', true)
}

// const tmpObj2 = {
//   id: '2',
//   name: 'hisdf',
//   addr: 'qd sbera hl',
//   active: true,
//   createdAt: moment('2016-11-08', 'YYYY-MM-DD', true)
// }

// const tmpObj = [tmpObj1, tmpObj2]

const obj = new schema.Entity('company')

const normalizeDate = fromJS(normalize(tmpObj1, obj))

console.log(normalizeDate)

const denormalizeDate = denormalize(1, obj, normalizeDate.get('entities').toJS())

console.log(denormalizeDate)
