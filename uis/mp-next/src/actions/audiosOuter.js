import fetch from 'isomorphic-fetch'

export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'

function receiveAudios(audios) {
  return {
    audios: audios,
    type: RECEIVE_AUDIOS
  }
}

export function fetchAudios() {
  return dispatch => {
    return fetch(
      '/react/v1/audios',
      { credentials: 'include' }
    ).then(response => response.json())
    .then(json => {
      dispatch(receiveAudios(json));
    })
  }
}
