import fetch from 'isomorphic-fetch'

export const REQUEST_SONGS = 'REQUEST_SONGS'
export const RECEIVE_SONGS = 'RECEIVE_SONGS'

function requestSongs() {
  return {
    isFetching: true,
    songs: [],
    type: REQUEST_SONGS
  }
}

function receiveSongs(json) {
  return {
    isFetching: false,
    songs: json,
    type: RECEIVE_SONGS
  }
}

export function fetchSongs() {
  return dispatch => {
    dispatch(requestSongs())
    return fetch(`http://localhost:3300/react/v1/audios`)
      .then(response => response.json())
      .then(json => dispatch(receiveSongs(json)))
  }
}
