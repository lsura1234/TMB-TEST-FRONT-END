import createFetcher from './createFetcher'

// const host = process.env.REACT_APP_HOST || ''
const useMock = true

const fetchPostList = params =>
  createFetcher({
    useMock,
    method: 'get',
    // url: `${host}/your-api-context`,
    url: 'https://jsonplaceholder.typicode.com/posts',
    params,
    jsonMock: 'posts.json',
    delay: 2
  })

export { fetchPostList }
