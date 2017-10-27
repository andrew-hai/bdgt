import fetch from 'isomorphic-fetch'

export const REQUEST_AUDIOS = 'REQUEST_AUDIOS'
export const RECEIVE_AUDIOS = 'RECEIVE_AUDIOS'
export const CURRENT_AUDIO = 'CURRENT_AUDIO'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const PLAY_AUDIO = 'PLAY_AUDIO'

function requestAudios() {
  return {
    isFetching: true,
    audios: [],
    type: REQUEST_AUDIOS
  }
}

function receiveAudios(json) {
  return {
    isFetching: false,
    audios: json,
    type: RECEIVE_AUDIOS
  }
}

function currentAudio(audio) {
  return {
    audio: audio,
    type: CURRENT_AUDIO
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

export function playAudio(audio, index) {
  return {
    audio: audio,
    index: index,
    type: PLAY_AUDIO
  }
}

export function fetchAudios() {
  return dispatch => {
    dispatch(requestAudios())
    return fetch(`http://videolist.com.ua/react/v1/audios`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveAudios(json));
        dispatch(currentAudio(json[0]));
      })
  }
}
