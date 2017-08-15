export const getValidateStatus = (error, warning, valid, asyncValidating) => {
  if (error) return 'error'
  if (warning) return 'warning'
  if (valid) return 'success'
  if (asyncValidating) return 'validating'
}

const mapError = ({
  meta,
  input,
  ...rest
}) => {
  const { touched, error, warning, valid, asyncValidating } = meta
  if (touched && (error || warning || valid || asyncValidating)) {
    return ({
      ...meta,
      ...input,
      validateStatus: getValidateStatus(error, warning, valid, asyncValidating),
      help: error || warning,
      ...rest
    })
  }

  return ({
    ...meta,
    ...input,
    ...rest
  })
}

export default mapError
