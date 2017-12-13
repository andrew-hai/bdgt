import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';
import PauseCircleOutline from 'material-ui-icons/PauseCircleOutline';

import {
  play,
  pause,
  playById
} from '../actions/index'

const styles = theme => ({
  avatar: {
    borderRadius: 0
  },
  filter: {
    paddingLeft: 0
  },
  list: {
    width: '100%'
  },
  root: {
    paddingTop: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper
  }
});

class AudiosList extends React.Component {
  playById = (index) => {
    const { dispatch } = this.props;
    dispatch(playById(index));
  }

  play = () => {
    const { dispatch } = this.props;
    dispatch(play());
  }

  pause = () => {
    const { dispatch } = this.props;
    dispatch(pause());
  }

  render() {
    const { audios, audioId, playing } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List className={classes.list}>
          {audios.map((audio, i) => (
            <span key={audio.id}>
              <ListItem>
                <Avatar src={audio.img} className={classes.avatar} />
                <ListItemText primary={audio.title} secondary={`${audio.artist} / ${audio.album} / ${audio.durationStr}`} />
                <ListItemSecondaryAction>
                  { (audioId === audio.id && !playing) &&
                    <IconButton onClick={this.play}>
                      <PlayCircleOutline color="rgba(0, 0, 0, 0.8)" />
                    </IconButton>
                  }
                  { (audioId === audio.id && playing) &&
                    <IconButton onClick={this.pause}>
                      <PauseCircleOutline color="rgba(0, 0, 0, 0.8)" />
                    </IconButton>
                  }
                  { (audioId !== audio.id) &&
                    <IconButton onClick={() => this.playById(audio.id)}>
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
