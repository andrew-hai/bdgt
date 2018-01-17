import fetch from 'isomorphic-fetch'

export const RECEIVE_USER = 'RECEIVE_USER'

function receiveUser(user) {
  return {
    user: user,
    type: RECEIVE_USER
  }
}

export function fetchUser() {
  return dispatch => {
    return fetch(
      '/react/v1/users/current',
      { credentials: 'include' }
    ).then(response => response.json())
    .then(json => {
      dispatch(receiveUser(json));
    })
  }
}
