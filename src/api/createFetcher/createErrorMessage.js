const getMessage = (res, options) => {
  if (res.head) return res.head.message
  if (res.message) return res.message
  if (res.messages) return res.messages[0]
  if (res.MessageTH) return res.MessageTH
  if (res.MessageEN) return res.MessageEN
  if (res.data.messageError) return res.data.messageError
  return `Service error | ${options.url}`
}

export default (res, options) => {
  throw Object({
    type: 'ERROR',
    message: getMessage(res, options)
  })
}
