import { createModule } from 'redux-modux'

const initialState = {
  list: []
}

const setPosts = (state, action) => ({
  ...state,
  list: action.list
})

const handlers = {
  setPosts
}

export default createModule({ moduleName: 'posts', initialState, handlers })
