// @flow

const addPrefix = (prefix: String) => (...constant): String => {
  const SEPARATOR = '_'
  return [prefix, ...constant].join(SEPARATOR)
}

export default addPrefix
