import Immutable, { fromJS } from 'immutable'
import moment from 'moment'
import { normalize, schema, denormalize } from 'normalizr'
import * as Routes from './src/server/exports/api'

const { company } = Routes
console.log(company)
const fullRoutes = Object.values(company).map(k => 'http://127.0.0.1:8000' + k)
console.log(fullRoutes)

const jsList = [1, 2, 3, 4]

const immList = Immutable.fromJS(jsList)

const result = immList.push(fromJS({ a: 1 }), fromJS({ B: 2 }))
const again = immList.push(fromJS({arr: [6, 8]}))

const final = result.concat(fromJS([2, 9]))

console.log(result)
console.log(result.get(5).get('B'))
console.log(again)
console.log(again.getIn(['4', 'arr']).toJS())
console.log(final)

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
console.log(JSON.stringify(normalizeCompany))

// const createCompany = normalize(tmpObj3, obj2)
// const normalizeNewCompany = fromJS(createCompany.entities)

// const semifinalCompany = normalizeCompany.mergeDeep(normalizeNewCompany)

// const finalCompany = semifinalCompany.deleteIn(['friend', '3'])

// console.log(fromJS([...normalizeCompany.get('company').values()]).toJS())
// console.log(normalizeCompany.get('company').valueSeq())
// console.log(normalizeCompany.get('company').toJS())

// console.log(finalCompany.getIn(['company', '2', 'friends']).toJS())

// const denormalizeDate = denormalize([1, 2, 3], [obj2], finalCompany.toJS())
// console.log(denormalizeDate)
