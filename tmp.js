import Immutable from 'immutable'

const data = Immutable.fromJS({a: 1, b: 2, c: 3})

const re = data.withMutations((data) => data.set('a', 5).set('b', 6).set('c', 7))
console.log(re)
