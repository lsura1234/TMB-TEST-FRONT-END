export default (res, options) => {
  if (res.status !== 200 && res.status !== 499) return true
  if (res.data.error) return true
  if (res.data.fault) return true
  if (res.data.IsError) return true
  return false
}
