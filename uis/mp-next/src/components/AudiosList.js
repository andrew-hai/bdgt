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
import SearchIcon from 'material-ui-icons/Search';
import GridOn from 'material-ui-icons/GridOn';
import Input, { InputAdornment }from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import {
  play,
  pause,
  playById,
  toView,
  filter
} from '../actions/index'

const styles = theme => ({
  avatar: {
    borderRadius: 0
  },
  filter: {
    paddingLeft: 0
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

  toView = () => {
    const { dispatch } = this.props;
    dispatch(toView('grid'));
  }

  filter = (event) => {
    const { dispatch } = this.props;
    dispatch(filter(event.target.value));
  }

  render() {
    const { audios, audioId, playing, filterStr } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List className={classes.list}>
          <ListItem style={{ height: 26 }}>
            <FormControl>
              <Input
                id="weight"
                placeholder="Filter songs"
                onChange={this.filter}
                value={filterStr}
                endAdornment={<InputAdornment position="end"><SearchIcon color="rgba(0, 0, 0, 0.5)" /></InputAdornment>}
                margin="normal"
              />
            </FormControl>
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
  filterStr: '',
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
