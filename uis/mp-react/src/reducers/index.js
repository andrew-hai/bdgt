import { combineReducers } from 'redux'
import {
  REQUEST_AUDIOS,
  RECEIVE_AUDIOS,
  CURRENT_AUDIO,
  PLAY,
  PAUSE,
  PLAY_AUDIO
} from '../actions/index'

function allAudios(state = {}, action) {
  switch (action.type) {
    case REQUEST_AUDIOS:
    case RECEIVE_AUDIOS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        audios: action.audios
      })
    default:
      return state
  }
}

function currentAudio(state = { audio: { artist: '', title: '', duration: 1, durationStr: '0:0', volume: 1 } }, action) {
  switch (action.type) {
    case CURRENT_AUDIO:
      const fullAudio = Object.assign({}, action.audio, {
        index: 0,
        audioDom: new Audio(action.audio.file_url),
        playing: false
      })
      fullAudio.audioDom.load();
      return Object.assign({}, state, {
        audio: fullAudio
      })
    case PLAY:
      const playAudio = Object.assign({}, state.audio, {
        playing: true
      })
      playAudio.audioDom.play();
      return Object.assign({}, state, {
        audio: playAudio
      })
    case PAUSE:
      const pauseAudio = Object.assign({}, state.audio, {
        playing: false
      })
      pauseAudio.audioDom.pause();
      return Object.assign({}, state, {
        audio: pauseAudio
      })
    case PLAY_AUDIO:
      const audioToPlay = Object.assign({}, action.audio, {
        index: action.index,
        audioDom: new Audio(action.audio.file_url),
        playing: true
      })
      state.audio.audioDom.pause();
      audioToPlay.audioDom.play();
      return Object.assign({}, state, {
        audio: audioToPlay
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  allAudios,
  currentAudio
})

export default rootReducer
