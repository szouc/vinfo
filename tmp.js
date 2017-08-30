import Immutable, { fromJS } from 'immutable'

const jsList = [1, 2, 3, 4]

const immList = Immutable.fromJS(jsList)

const result = immList.push(fromJS({ a: 1 }), fromJS({ B: 2 }))

console.log(result)
console.log(result.get(5).get('B'))
