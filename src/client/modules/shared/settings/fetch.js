import 'isomorphic-fetch'
import { isProd } from '../../../../shared/utils'

const corsFetch = (url, options) => {
  const credOptions =
  isProd
    ? {
      ...options
    }
    : {
      ...options,
      credentials: 'include'
    }

  return fetch(url, credOptions)
}

export default corsFetch
