import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import ShuffleIcon from 'material-ui-icons/Shuffle';
import { LinearProgress } from 'material-ui/Progress';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import {
  play,
  pause,
  skip,
  toggleShuffle,
  changeVolume
} from '../actions/index';

const styles = theme => ({
  time: {
    flex: 1,
    textAlign: 'center'
  },
  title: {
    flex: 3,
    textAlign: 'center'
  },
  playProgressRoot: {
    flex: 2,
    margin: '0 25px;'
  }
});

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playProgress: 0,
      playProgressStr: '0:00'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audioDom) {
      this.props.audioDom.addEventListener('ended', this.skipNext);
      this.props.audioDom.addEventListener('timeupdate', this.timeUpdate);
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
    const { dispatch } = this.props;
    dispatch(skip('previous'));
  }

  skipNext = () => {
    const { dispatch } = this.props;
    dispatch(skip('next'));
  }

  toggleShuffle = () => {
    const { dispatch } = this.props;
    dispatch(toggleShuffle());
  }

  changeVolume = (event) => {
    const { dispatch } = this.props;
    dispatch(changeVolume(event.target.value));
  }

  timeUpdate = () => {
    const p1 = Math.floor(this.props.audioDom.currentTime / 60);
    let p2 = Math.round(this.props.audioDom.currentTime % 60);
    if (p2 < 10) { p2 = '0' + p2; }
    this.setState({ playProgressStr: `${p1}:${p2}` });

    const audio = this.props.allAudios.find(a => a.id === this.props.audioId);
    this.setState({ playProgress: (this.props.audioDom.currentTime / audio.duration * 100) });
  }

  render() {
    const { classes } = this.props;
    const { playing, shuffle, volume } = this.props;
    const audio = this.props.allAudios.find(a => a.id === this.props.audioId) || {};

    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={this.skipPrevious} aria-label="Skip Previous">
            <SkipPreviousIcon />
          </IconButton>
          {!playing &&
            <IconButton color="inherit" onClick={this.play} aria-label="Play">
              <PlayArrowIcon />
            </IconButton>
          }
          {playing &&
            <IconButton color="inherit" onClick={this.pause} aria-label="Pause">
              <PauseIcon />
            </IconButton>
          }
          <IconButton color="inherit" onClick={this.skipNext} aria-label="Skip Next">
            <SkipNextIcon />
          </IconButton>
          <div className={classes.playProgressRoot}>
            <LinearProgress color="secondary" variant="determinate" value={this.state.playProgress} />
          </div>

          <FormControl>
            <InputLabel htmlFor="volume" style={{color: '#FFF'}}>Volume</InputLabel>
            <Select
              value={volume}
              input={<Input id="volume" />}
              onChange={this.changeVolume}
              style={{color: '#FFF'}}
            >
              <MenuItem value={0}>
                <em>0%</em>
              </MenuItem>
              <MenuItem value={0.25}>25%</MenuItem>
              <MenuItem value={0.5}>50%</MenuItem>
              <MenuItem value={0.75}>75%</MenuItem>
              <MenuItem value={1}>100%</MenuItem>
            </Select>
          </FormControl>

          {!shuffle &&
            <IconButton color="inherit" onClick={this.toggleShuffle} aria-label="Shuffle">
              <ShuffleIcon />
            </IconButton>
          }
          {shuffle &&
            <IconButton color="secondary" onClick={this.toggleShuffle} aria-label="Shuffle">
              <ShuffleIcon />
            </IconButton>
          }
          <Typography type="title" color="inherit" className={classes.time}>
            { this.state.playProgressStr + ' / ' + audio.durationStr }
          </Typography>
          <Typography type="title" color="inherit" className={classes.title}>
            { audio.artist + ' / ' + audio.title }
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Player.defaultProps = {
  allAudios: [],
  playing: false,
  shuffle: false,
  volume: 0.25,
  audio: {
    title: '...',
    artist: '...'
  }
};

Player.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return state.playerData;
}

export default connect(mapStateToProps)(
  withStyles(styles)(Player)
)
