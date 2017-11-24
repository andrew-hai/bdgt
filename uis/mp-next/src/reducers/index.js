import { combineReducers } from 'redux'
import {
  RECEIVE_AUDIOS,
  PLAY,
  PAUSE,
  SKIP,
  PLAY_BY_INDEX,
  TO_VIEW,
  TOGGLE_SHUFFLE,
  CHANGE_VOLUME
} from '../actions/index'

function playerData(state = { playing: false, shuffle: false, audios: [], view: 'list', volume: 0.5 }, action) {
  switch (action.type) {
    case RECEIVE_AUDIOS:
      const audioDom = new Audio(action.audios[0].file_url);
      audioDom.volume = 0.5;

      return Object.assign({}, state, {
        audioIndex: 0,
        audioDom: audioDom,
        audios: action.audios.map((a, i) => Object.assign(a, { index: i }))
      });
    case PLAY:
      state.audioDom.play();

      return Object.assign({}, state, { playing: true });
    case PAUSE:
      state.audioDom.pause();

      return Object.assign({}, state, { playing: false });
    case SKIP:
      let skipTo;

      if (action.direction === 'next') {
        if (state.shuffle) {
          skipTo = Math.round((Math.random() * (state.audios.length - 0) + 0));
        } else {
          skipTo = state.audioIndex + 1;
        }
      } else if (action.direction === 'previous') {
        skipTo = state.audioIndex - 1;
      }

      if (skipTo < 0 || skipTo >= (state.audios.length - 1)) { skipTo = 0; }

      if (!!state.audioDom) { state.audioDom.pause(); }

      return Object.assign({}, state, {
        audioIndex: skipTo,
        audioDom: createAndPlay(state, skipTo),
        playing: true
      });
    case PLAY_BY_INDEX:
      let index = action.index;
      if (index < 0 || index > state.audios.length) { index = 0; }

      if (!!state.audioDom) { state.audioDom.pause(); }

      return Object.assign({}, state, {
        audioIndex: index,
        audioDom: createAndPlay(state, index),
        playing: true
      });
    case TO_VIEW:
      return Object.assign({}, state, { view: action.view });
    case TOGGLE_SHUFFLE:
      return Object.assign({}, state, { shuffle: !state.shuffle });
    case CHANGE_VOLUME:
      if (!!state.audioDom) { state.audioDom.volume = action.volume; }

      return Object.assign({}, state, { volume: action.volume });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  playerData
})

export default rootReducer

function createAndPlay(state, index) {
  const audioDom = new Audio(state.audios[index].file_url);
  audioDom.volume = state.volume;
  audioDom.play();
  return audioDom;
}
