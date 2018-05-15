import Immutable, { fromJS } from 'immutable'
import moment from 'moment'
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'

let state,
  list1Selector,
  list2Selector,
  keywordSelector,
  filteredList2Selector,
  createImmutableSelector

// state for reducer a:
state = Immutable.Map({
  list1: Immutable.List(),
  list2: Immutable.List(['hello goodbye', 'hello hello']),
  keyword: ''
})

list1Selector = state => state.get('list1')
list2Selector = state => state.get('list2')
keywordSelector = state => state.get('keyword')

filteredList2Selector = createSelector(
  [list2Selector, keywordSelector],
  (list2, keyword) => {
    return list2.filter(x => {
      return x.indexOf(keyword) !== -1
    })
  }
)

const somethingExpensive1Selector = createSelector(
  [list1Selector, filteredList2Selector],
  (list1, filteredList2) => {
    console.log('EXPENSIVE COMPUTATION TRIGGERED! Generating for ===...')
    return Math.random()
  }
)

createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is)

const somethingExpensive2Selector = createImmutableSelector(
  [list1Selector, filteredList2Selector],
  (list1, filteredList2) => {
    console.log(
      'EXPENSIVE COMPUTATION TRIGGERED! Generating for Immutable.is()...'
    )
    return Math.random()
  }
)

state = state.set('keyword', '')
console.log('expensive1(state)', somethingExpensive1Selector(state))
state = state.set('keyword', 'he')
console.log('expensive1(state)', somethingExpensive1Selector(state))
state = state.set('keyword', 'hell')
console.log('expensive1(state)', somethingExpensive1Selector(state))
state = state.set('keyword', 'helldsfs')
console.log('expensive1(state)', somethingExpensive1Selector(state))
console.log('')
console.log('====================================')
console.log('')
state = state.set('keyword', '')
console.log('expensive2(state)', somethingExpensive2Selector(state))
state = state.set('keyword', 'he')
console.log('expensive2(state)', somethingExpensive2Selector(state))
state = state.set('keyword', 'hell')
console.log('expensive2(state)', somethingExpensive2Selector(state))
state = state.set('keyword', 'helldsfs')
console.log('expensive2(state)', somethingExpensive2Selector(state))

const data = {
  theme: {
    dark: {
      color: '#e8e',
      font: '1'
    },
    light: {
      color: '#8e8',
      font: '2'
    }
  },
  another: 'aaa'
}

const newData = { ...data }

const data1 = fromJS(data)
const newData1 = data1.setIn(['theme', 'light', 'font'], '3')

newData.theme.light.font = '3'

console.log(data === newData)
console.log(data.theme.light === newData.theme.light)
console.log(data.another === newData.another)

console.log(data1 === newData1)
console.log(
  data1.getIn(['theme', 'light']) === newData1.getIn(['theme', 'light'])
)
console.log(data1.get('another') === newData1.get('another'))

console.log(data1.updateIn(['light', 'cert'], date => date && moment(date)))
