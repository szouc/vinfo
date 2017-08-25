import 'isomorphic-fetch'

const corsFetch = (url, options) => {
  const credOptions = {
    ...options,
    credentials: 'include'
  }

  return fetch(url, credOptions)
}

export default corsFetch
