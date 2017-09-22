import React from 'react';

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

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio('http://localhost:3000/audios/214adca37638f857bf2784577017828ddd45f3a3.mp3?1501775274'),
      playing: false,
      songName: 'Hello World'
    };
  }

  playMusic = () => {
    this.state.audio.play();
    this.setState({playing: true});
  }

  pauseMusic = () => {
    this.state.audio.pause();
    this.setState({playing: false});
  }

  skipNext = () => {
    this.setState({playing: true});
    this.setState({ audio: new Audio('http://localhost:3000/audios/890e94b7f4e57cb104794eaa777468ff246af830.mp3?1501776408') }, () => {
      this.state.audio.play();
    });
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          {!this.state.playing &&
            <IconButton style={iconButtonStyle} onTouchTap={this.playMusic} iconStyle={iconStyle}>
              <PlayArrow color="black" />
            </IconButton>
          }
          {this.state.playing &&
            <IconButton style={iconButtonStyle} onTouchTap={this.pauseMusic} iconStyle={iconStyle}>
              <Pause color="black" />
            </IconButton>
          }
          <IconButton style={iconButtonStyle} iconStyle={iconStyle}>
            <SkipPrevious color="black" />
          </IconButton>
          <IconButton style={iconButtonStyle} onTouchTap={this.skipNext} iconStyle={iconStyle}>
            <SkipNext color="black" />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={this.state.songName} />
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
