import { createStore } from 'redux'

const initialState = { sidebarShow: true, dataLoading: false, renderHeader : false }

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'render-header':
        return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
