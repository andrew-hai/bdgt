import React from 'react';

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
      playing: false,
      songArtist: '...',
      songTitle: '...',
      songIndex: 0
    };
  }

  playMusic = () => {
    if (!this.state.audio) {
      this.skip(0);
    } else {
      this.state.audio.play();
      this.setState({playing: true});
    }
  }

  pauseMusic = () => {
    this.state.audio.pause();
    this.setState({playing: false});
  }

  SkipPrevious = () => {
    this.skip(-1);
  }

  skipNext = () => {
    this.skip(1);
  }

  skip = (i) => {
    if (this.state.audio) {
      this.state.audio.pause();
    }

    const nextIndex = this.state.songIndex + i;
    this.setState(
      {
        audio: new Audio(this.props.songs[nextIndex].file_url),
        playing: true,
        songArtist: this.props.songs[nextIndex].artist,
        songTitle: this.props.songs[nextIndex].title,
        songIndex: nextIndex
      },
      () => {
        this.state.audio.play();
      }
    );
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton style={iconButtonStyle} onClick={this.SkipPrevious} iconStyle={iconStyle}>
            <SkipPrevious color="black" />
          </IconButton>
          {!this.state.playing &&
            <IconButton style={iconButtonStyle} onClick={this.playMusic} iconStyle={iconStyle}>
              <PlayArrow color="black" />
            </IconButton>
          }
          {this.state.playing &&
            <IconButton style={iconButtonStyle} onClick={this.pauseMusic} iconStyle={iconStyle}>
              <Pause color="black" />
            </IconButton>
          }
          <IconButton style={iconButtonStyle} onClick={this.skipNext} iconStyle={iconStyle}>
            <SkipNext color="black" />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={this.state.songArtist + ' : ' + this.state.songTitle} />
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

function mapStateToProps(state) {
  return state.allSongs;
}

export default connect(mapStateToProps)(Player)
