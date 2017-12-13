import fetch from 'isomorphic-fetch'

export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const SKIP = 'SKIP'
export const PLAY_BY_ID = 'PLAY_BY_ID'
export const TO_VIEW = 'TO_VIEW'
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const FILTER = 'FILTER'

export const RECEIVE_USER = 'RECEIVE_USER'

function receiveAudios(audios) {
  return {
    audios: audios,
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

export function playById(id) {
  return {
    id: id,
    type: PLAY_BY_ID
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

export function filter(value) {
  return {
    value: value,
    type: FILTER
  }
}

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
