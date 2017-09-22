import { combineReducers } from 'redux'
import {
  REQUEST_SONGS,
  RECEIVE_SONGS
} from '../actions/index'

function songsLoad(state = {}, action) {
  switch (action.type) {
    case RECEIVE_SONGS:
    case REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        songs: action.songs
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  songsLoad
})

export default rootReducer
