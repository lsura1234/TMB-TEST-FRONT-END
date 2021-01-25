import createFetcher from './createFetcher'

// const host = process.env.REACT_APP_HOST || ''
const useMock = false

// daliy key
const key = 'n4x5MEGTK0tMbKuHXz4rD4RE7BzGq9TSnwik'

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

const fetchCurrenciesList = () =>
  createFetcher({
    useMock,
    method: 'get',
    // url: `${host}/your-api-context`,
    url: `https://currencyapi.net/api/v1/currencies?key=${key}`,
    jsonMock: 'posts.json',
    delay: 2
  })
const fetchCurrenciesRate = (params) =>
  createFetcher({
    useMock,
    method: 'get',
    // url: `${host}/your-api-context`,
    url: `https://currencyapi.net/api/v1/rates?key=${key}`,
    params,
    jsonMock: 'posts.json',
    delay: 2
  })

export { fetchPostList, fetchCurrenciesList, fetchCurrenciesRate }
