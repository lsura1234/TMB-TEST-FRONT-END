import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

import createErrorMessage from './createErrorMessage'
import isServiceError from './isServiceError'

const defaultOptions = {
  useMock: false,
  hybridModule: false,
  delay: 0,
  jsonMock: '',
  method: 'get',
  url: '',
  params: {},
  data: {},
  timeout: 10000,
  headers: {}
}

export default (userOptions) => {
  const options = { ...defaultOptions, ...userOptions }
  const { useMock, jsonMock, url, delay } = options
  const serviceURL = useMock ? `/JSONMockup/${jsonMock}` : url

  return new Promise((resolve) => {
    setTimeout(async () => {
      if (useMock) {
        options.method = 'get'
        options.url = serviceURL
      }
      resolve(fetch(options))
    }, delay * 1000)
  })
}

const getCallNative = () => {
  // eslint-disable-next-line no-restricted-globals
  if (parent.HybridModule !== undefined) return parent.HybridModule.callNative
  // eslint-disable-next-line no-undef
  if (HybridModule !== undefined) return HybridModule.callNative

  throw Object({
    type: 'ERROR',
    message: 'HybridModule is not defined.'
  })
}

const fetchNative = (options) => {
  if (options.useMock) return axios(options)

  const search = new URLSearchParams(options.params)
  const url = isEmpty(options.params) ? options.url : `${options.url}?${search}`

  const callNative = getCallNative()
  return callNative(url, window.location)
}

const getResponseData = (res, options) => {
  if (options.useMock && options.hybridModule) {
    const status = res.data.head.code
    return { status, data: res.data }
  }

  if (options.hybridModule) {
    return { status: res.head.code, data: res }
  }

  return res
}

const callAPI = (options) => {
  if (options.hybridModule) return fetchNative(options)
  return axios(options)
}

const fetch = async (options) => {
  try {
    const res = await callAPI(options)
    const responseData = getResponseData(res, options)

    if (isServiceError(responseData, options)) {
      createErrorMessage(responseData, options)
    }

    return responseData
  } catch (err) {
    createErrorMessage(err.response, options)
  }
}
