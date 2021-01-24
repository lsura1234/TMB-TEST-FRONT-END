export default (() => {
  let url = process.env.REACT_APP_HOST

  return {
    get: () => url,
    set: newUrl => (url = newUrl)
  }
})()
