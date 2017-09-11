import { createSelectorCreator, defaultMemoize } from 'reselect'
import Immutable from 'immutable'

// create a "selector creator" that uses immutable.is instead of ===
const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  Immutable.is
)
export default createImmutableSelector
