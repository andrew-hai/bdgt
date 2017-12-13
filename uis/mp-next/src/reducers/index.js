import { combineReducers } from 'redux'
import playerData from './playerData'
import userData from './userData'

const rootReducer = combineReducers({
  playerData,
  userData
})

export default rootReducer
