export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const SKIP = 'SKIP'
export const PLAY_BY_ID = 'PLAY_BY_ID'
export const TO_VIEW = 'TO_VIEW'
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const FILTER = 'FILTER'

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
