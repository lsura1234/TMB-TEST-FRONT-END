import { createActionWithFetching } from '../utils'
import { fetchPostList } from '../api/fetchers'
import post from '../modules/post'

const getPostList = () => {
  const callAction = async dispatch => {
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

export { getPostList }
