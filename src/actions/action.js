import { createActionWithFetching } from '../utils'
import { fetchPostList, fetchCurrenciesList, fetchCurrenciesRate } from '../api/fetchers'
import post from '../modules/post'

const getPostList = () => {
  const callAction = async (dispatch) => {
    const params = {}
    const { data } = await fetchPostList(params)

    dispatch(
      post.setPosts({
        list: data
      })
    )
  }

  return createActionWithFetching({
    loadingMessage: 'Fetching data..',
    successMessage: 'Success',
    callAction
  })
}
const getCurrenciesList = () => {
  const callAction = async (dispatch) => {
    const { data } = await fetchCurrenciesList()
    const rate = await fetchCurrenciesRate()

    dispatch(
      post.set({
        key: 'currencies',
        value: data.currencies
      })
    )

    dispatch(
      post.set({
        key: 'rates',
        value: rate.data.rates
      })
    )
  }

  return createActionWithFetching({
    loadingMessage: 'Fetching data..',
    successMessage: 'Success',
    callAction
  })
}

export { getPostList, getCurrenciesList }
