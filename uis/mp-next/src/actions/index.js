import fetch from 'isomorphic-fetch'

export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const SKIP = 'SKIP'
export const PLAY_BY_INDEX = 'PLAY_BY_INDEX'
export const TO_VIEW = 'TO_VIEW'
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'

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
  return dispatch => {
    return fetch(`http://videolist.com.ua/react/v1/audios`)
      .then(response => response.json())
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
