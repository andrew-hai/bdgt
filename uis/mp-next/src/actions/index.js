import fetch from 'isomorphic-fetch'

export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const SKIP = 'SKIP'
export const PLAY_BY_INDEX = 'PLAY_BY_INDEX'
export const TO_VIEW = 'TO_VIEW'
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const CHANGE_VOLUME = 'CHANGE_VOLUME'

function receiveAudios(json) {
  return {
    audios: json,
    type: RECEIVE_AUDIOS
  }
}

export function play() {
  return {
    playing: true,
    type: PLAY
  }
}

export function pause() {
  return {
    playing: false,
    type: PAUSE
  }
}

export function skip(direction) {
  return {
    direction: direction,
    type: SKIP
  }
}

export function playByIndex(index) {
  return {
    index: index,
    type: PLAY_BY_INDEX
  }
}

export function fetchAudios() {
  // /react/v1/audios
  // /users/sign_in
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

export function toView(view) {
  return {
    view: view,
    type: TO_VIEW
  }
}

export function toggleShuffle() {
  return {
    type: TOGGLE_SHUFFLE
  }
}

export function changeVolume(volume) {
  return {
    volume: volume,
    type: CHANGE_VOLUME
  }
}
