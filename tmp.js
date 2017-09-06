import Immutable, { fromJS } from 'immutable'
import moment from 'moment'
import { normalize, schema, denormalize } from 'normalizr'

const tmpObj1 = {
  id: '1',
  name: 'hl',
  addr: 'qd sb hl',
  active: true,
  friends: [
    {
      id: '2',
      name: 'hisdf'
    },
    {
      id: '3',
      name: 'dhisdf'
    }
  ],
  createdAt: moment('2016-12-08', 'YYYY-MM-DD', true)
}

const tmpObj2 = {
  id: '2',
  name: 'hisdf',
  addr: 'qd sbera hl',
  active: true,
  friends: [
    {
      id: '3',
      name: 'dhisdf'
    }
  ],
  createdAt: moment('2016-11-08', 'YYYY-MM-DD', true)
}

const tmpObj3 = {
  id: '3',
  name: 'dhisdf',
  addr: 'qd sbera hl',
  active: true,
  friends: [
    {
      id: '1',
      name: 'hl'
    }
  ],
  createdAt: moment('2016-11-09', 'YYYY-MM-DD', true)
}

const tmpObj = [tmpObj1, tmpObj2]

const obj = new schema.Entity('friend')
const obj2 = new schema.Entity('company', {
  friends: [obj]
})
const obj3 = [obj2]

const normalizeDate = normalize(tmpObj, obj3)
const normalizeCompany = fromJS(normalizeDate.entities)
console.log(normalizeCompany)

const createCompany = normalize(tmpObj3, obj2)
const normalizeNewCompany = fromJS(createCompany.entities)

const semifinalCompany = normalizeCompany.mergeDeep(normalizeNewCompany)

const finalCompany = semifinalCompany.deleteIn(['friend', '3'])

console.log(normalizeCompany.get('company').toJS())

const denormalizeDate = denormalize([1, 2, 3], [obj2], finalCompany)
const denormalizeImmut = denormalize(1, obj2, finalCompany)
console.log(denormalizeDate)
console.log(denormalizeImmut)
