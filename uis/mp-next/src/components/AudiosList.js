import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Subheader from 'material-ui/List/ListSubheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';
import PauseCircleOutline from 'material-ui-icons/PauseCircleOutline';
import GridOn from 'material-ui-icons/GridOn';

import {
  play,
  pause,
  playByIndex,
  toView
} from '../actions/index'

const styles = theme => ({
  avatar: {
    borderRadius: 0
  },
  list: {
    width: '100%',
    maxWidth: 1100
  },
  root: {
    paddingTop: 64,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper
  }
});

class AudiosList extends React.Component {
  playByIndex = (index) => {
    const { dispatch } = this.props;
    dispatch(playByIndex(index));
  }

  play = () => {
    const { dispatch } = this.props;
    dispatch(play());
  }

  pause = () => {
    const { dispatch } = this.props;
    dispatch(pause());
  }

  toView = () => {
    const { dispatch } = this.props;
    dispatch(toView('grid'));
  }

  render() {
    const { audios, audioIndex, playing } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List className={classes.list}>
          <ListItem style={{ height: 26 }}>
            <Subheader component="div">Whole Playlist</Subheader>
            <ListItemSecondaryAction>
              <IconButton onClick={() => this.toView()}>
                <GridOn color="rgba(0, 0, 0, 0.8)" />
              </IconButton>
            </ListItemSecondaryAction>
          </ ListItem>
          <Divider />
          {audios.map((audio, i) => (
            <span key={audio.id}>
              <ListItem>
                <Avatar src={audio.img} className={classes.avatar} />
                <ListItemText primary={audio.title} secondary={`${audio.artist} / ${audio.album} / ${audio.durationStr}`} />
                <ListItemSecondaryAction>
                  { (audioIndex === audio.index && !playing) &&
                    <IconButton onClick={this.play}>
                      <PlayCircleOutline color="rgba(0, 0, 0, 0.8)" />
                    </IconButton>
                  }
                  { (audioIndex === audio.index && playing) &&
                    <IconButton onClick={this.pause}>
                      <PauseCircleOutline color="rgba(0, 0, 0, 0.8)" />
                    </IconButton>
                  }
                  { (audioIndex !== audio.index) &&
                    <IconButton onClick={() => this.playByIndex(audio.index)}>
                      <PlayCircleOutline color="rgba(0, 0, 0, 0.8)" />
                    </IconButton>
                  }
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </div>
    );
  }
}

AudiosList.defaultProps = {
  audios: [],
  playing: false
};

AudiosList.propTypes = {
  audios: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state.playerData;
}

export default connect(mapStateToProps)(
  withStyles(styles)(AudiosList)
)
