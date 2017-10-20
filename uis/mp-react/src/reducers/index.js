import { combineReducers } from 'redux'
import {
  REQUEST_SONGS,
  RECEIVE_SONGS
} from '../actions/index'

function allSongs(state = {}, action) {
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
  allSongs
})

export default rootReducer
