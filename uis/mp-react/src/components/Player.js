import React from 'react';

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import SkipNext from 'material-ui/svg-icons/av/skip-next';

import Shuffle from 'material-ui/svg-icons/av/shuffle';
import RepeatOne from 'material-ui/svg-icons/av/repeat-one';

import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Download from 'material-ui/svg-icons/file/file-download';

import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Slider from 'material-ui/Slider';

import {
  play,
  pause,
  playAudio
} from '../actions/index'

const iconButtonStyle = {
  // width: 48,
  // height: 48,
  // padding: 10,
};

const iconStyle = {
  // width: 28,
  // height: 28,
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAudioTime: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentAudio.audio.audioDom) {
      this.props.currentAudio.audio.audioDom.addEventListener('ended', this.skipNext);
      this.props.currentAudio.audio.audioDom.addEventListener('timeupdate', this.timeUpdate);
    }
  }

  play = () => {
    const { dispatch } = this.props;
    dispatch(play());
  }

  pause = () => {
    const { dispatch } = this.props;
    dispatch(pause());
  }

  skipPrevious = () => {
    const { dispatch, currentAudio, allAudios } = this.props;
    const audioToPlay = allAudios.audios[currentAudio.audio.index - 1];
    if (!!audioToPlay) {
      dispatch(playAudio(audioToPlay, currentAudio.audio.index - 1));
    }
  }

  skipNext = () => {
    const { dispatch, currentAudio, allAudios } = this.props;
    const audioToPlay = allAudios.audios[currentAudio.audio.index + 1];
    if (!!audioToPlay) {
      dispatch(playAudio(audioToPlay, currentAudio.audio.index + 1));
    }
  }

  rewind = (e, newValue) => {
    this.props.currentAudio.audio.audioDom.currentTime = newValue;
  }

  changeVolume = (e, newValue) => {
    this.props.currentAudio.audio.audioDom.volume = newValue;
  }

  timeUpdate = () => {
    this.setState({ currentAudioTime: this.props.currentAudio.audio.audioDom.currentTime })
  }

  render() {
    const { audio } = this.props.currentAudio;
    const { currentAudioTime } = this.state;
    const volume = (!!audio.audioDom) ? audio.audioDom.volume : 0;
    // Error connected with currentAudioTime

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton style={iconButtonStyle} onClick={this.skipPrevious} iconStyle={iconStyle}>
            <SkipPrevious color="black" />
          </IconButton>
          {!audio.playing &&
            <IconButton style={iconButtonStyle} onClick={this.play} iconStyle={iconStyle}>
              <PlayArrow color="black" />
            </IconButton>
          }
          {audio.playing &&
            <IconButton style={iconButtonStyle} onClick={this.pause} iconStyle={iconStyle}>
              <Pause color="black" />
            </IconButton>
          }
          <IconButton style={iconButtonStyle} onClick={this.skipNext} iconStyle={iconStyle}>
            <SkipNext color="black" />
          </IconButton>
          <Slider
            style={{width: 300, paddingTop: 25, marginLeft: 25}}
            value={currentAudioTime}
            max={audio.duration}
            step={1}
            onChange={this.rewind}
          />
          <Slider
            style={{width: 75, paddingTop: 25, marginLeft: 25}}
            value={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={this.changeVolume}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={audio.artist + ' / ' + audio.title + ' / ' + audio.duration} />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconButton style={iconButtonStyle} iconStyle={iconStyle}>
            <Shuffle color="black" />
          </IconButton>
          <IconButton style={iconButtonStyle} iconStyle={iconStyle}>
            <RepeatOne color="black" />
          </IconButton>
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" leftIcon={<Download />} />
            <MenuItem primaryText="More Info" leftIcon={<RemoveRedEye />} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

Player.defaultProps = {
  currentAudio: { audio: {
    artist: '',
    title: '',
    duration: 1,
    durationStr: '0:0'
  }}
};

Player.propTypes = {
  currentAudio: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Player)
