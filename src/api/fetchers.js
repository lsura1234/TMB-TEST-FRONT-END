import createFetcher from './createFetcher'

// const host = process.env.REACT_APP_HOST || ''
const useMock = false

const fetchPostList = (params) =>
  createFetcher({
    useMock,
    method: 'get',
    // url: `${host}/your-api-context`,
    url: 'https://jsonplaceholder.typicode.com/posts',
    params,
    jsonMock: 'posts.json',
    delay: 2
  })

const fetchCurrenciesList = (params) =>
  createFetcher({
    useMock,
    method: 'get',
    // url: `${host}/your-api-context`,
    url: 'https://currencyapi.net/api/v1/currencies?key=JAhTJLZ0uj1AqxCNmO0fzGkEfZ33kkQLrZ6c',
    params,
    jsonMock: 'posts.json',
    delay: 2
  })

export { fetchPostList, fetchCurrenciesList }
