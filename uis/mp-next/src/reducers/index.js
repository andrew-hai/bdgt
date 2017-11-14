import { combineReducers } from 'redux'
import {
  RECEIVE_AUDIOS,
  PLAY,
  PAUSE,
  SKIP,
  PLAY_BY_INDEX,
  TO_VIEW,
  TOGGLE_SHUFFLE
} from '../actions/index'

function playerData(state = { playing: false, shuffle: false, audios: [], view: 'list' }, action) {
  switch (action.type) {
    case RECEIVE_AUDIOS:
      return Object.assign({}, state, {
        audioIndex: 0,
        audioDom: new Audio(action.audios[0].file_url),
        audios: action.audios.map((a, i) => Object.assign(a, { index: i }))
      });
    case PLAY:
      state.audioDom.play();

      return Object.assign({}, state, { playing: true });
    case PAUSE:
      state.audioDom.pause();

      return Object.assign({}, state, { playing: false });
    case SKIP:
      let skipTo = state.audioIndex + action.by;
      if (skipTo < 0 || skipTo >= (state.audios.length - 1)) { skipTo = 0; }

      if (!!state.audioDom) { state.audioDom.pause(); }

      return Object.assign({}, state, {
        audioIndex: skipTo,
        audioDom: createAndPlay(state.audios[skipTo].file_url),
        playing: true
      });
    case PLAY_BY_INDEX:
      let index = action.index;
      if (index < 0 || index > state.audios.length) { index = 0; }

      if (!!state.audioDom) { state.audioDom.pause(); }

      return Object.assign({}, state, {
        audioIndex: index,
        audioDom: createAndPlay(state.audios[index].file_url),
        playing: true
      });
    case TO_VIEW:
      return Object.assign({}, state, { view: action.view });
    case TOGGLE_SHUFFLE:
      return Object.assign({}, state, { shuffle: !state.shuffle });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  playerData
})

export default rootReducer

function createAndPlay(file_url) {
  const audioDom = new Audio(file_url);
  audioDom.volume = 0.5;
  audioDom.play();
  return audioDom;
}
