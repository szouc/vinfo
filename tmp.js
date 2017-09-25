import Immutable, { fromJS, is } from 'immutable'

const str = '12345@@张三'

const name = str.split('@@')

console.log(name)
