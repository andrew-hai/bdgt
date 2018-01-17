import {
  RECEIVE_AUDIOS,
  PLAY,
  PAUSE,
  SKIP,
  PLAY_BY_ID,
  TO_VIEW,
  TOGGLE_SHUFFLE,
  CHANGE_VOLUME,
  FILTER
} from '../actions/index'

function playerData(state = { playing: false, shuffle: false, audios: [], view: 'list', volume: 0.25 }, action) {
  switch (action.type) {
    case RECEIVE_AUDIOS:
      const audioDom = new Audio(action.audios[0].file_url);
      audioDom.volume = state.volume;

      return Object.assign({}, state, {
        audioId: action.audios[0].id,
        audioDom: audioDom,
        audios: action.audios.map((a, i) => Object.assign(a, { index: i })),
        allAudios: action.audios.map((a, i) => Object.assign(a, { index: i }))
      });
    case PLAY:
      state.audioDom.play();

      return Object.assign({}, state, { playing: true });
    case PAUSE:
      state.audioDom.pause();

      return Object.assign({}, state, { playing: false });
    case SKIP:
      if (!state.audios.length) { return state; }

      let skipTo;
      const currentIndex = state.audios.indexOf(state.audios.find(a => a.id === state.audioId));

      if (action.direction === 'next') {
        if (state.shuffle) {
          skipTo = Math.round((Math.random() * (state.audios.length - 0) + 0));
        } else {
          skipTo = currentIndex + 1;
        }
      } else if (action.direction === 'previous') {
        skipTo = currentIndex - 1;
      }

      if (skipTo < 0 || skipTo >= (state.audios.length)) { skipTo = 0; }

      if (!!state.audioDom) { state.audioDom.pause(); }

      const audioId = state.audios[skipTo].id;

      return Object.assign({}, state, {
        audioId: audioId,
        audioDom: createAndPlay(state, audioId),
        playing: true
      });
    case PLAY_BY_ID:
      if (!!state.audioDom) { state.audioDom.pause(); }

      return Object.assign({}, state, {
        audioId: action.id,
        audioDom: createAndPlay(state, action.id),
        playing: true
      });
    case TO_VIEW:
      return Object.assign({}, state, { view: action.view });
    case TOGGLE_SHUFFLE:
      return Object.assign({}, state, { shuffle: !state.shuffle });
    case CHANGE_VOLUME:
      if (!!state.audioDom) { state.audioDom.volume = action.volume; }

      return Object.assign({}, state, { volume: action.volume });
    case FILTER:
      let audios;

      if (!!action.value) {
        const term = action.value.toLowerCase();
        audios = state.allAudios.filter(a => {
          return a.title.toLowerCase().match(term) || a.artist.toLowerCase().match(term);
        });
      } else {
        audios = state.allAudios.map(a => a);
      }

      return Object.assign({}, state, {
        audios: audios,
        filterStr: action.value
      });
    default:
      return state
  }
}

export default playerData

function createAndPlay(state, id) {
  const audio = state.audios.find(a => a.id === id)
  const audioDom = new Audio(audio.file_url);
  audioDom.volume = state.volume;
  audioDom.play();
  return audioDom;
}
