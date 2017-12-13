import {
  RECEIVE_USER
} from '../actions/index'

function userData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, action.user );
    default:
      return state
  }
}

export default userData
