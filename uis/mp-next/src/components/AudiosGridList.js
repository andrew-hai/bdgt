import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';
import PauseCircleOutline from 'material-ui-icons/PauseCircleOutline';

import {
  play,
  pause,
  playById
} from '../actions/index'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    paddingTop: 0
  },
  textRight: {
    textAlign: 'right'
  },
  button: {
    color: 'white'
  }
});

class AudiosGridList extends React.Component {
  playById = (index) => {
    const { dispatch } = this.props;
    dispatch(playById(index));
  };

  play = () => {
    const { dispatch } = this.props;
    dispatch(play());
  };

  pause = () => {
    const { dispatch } = this.props;
    dispatch(pause());
  };

  render() {
    const { audios, audioId, playing } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridList cellHeight={180} className={classes.gridList} cols={5}>
          {audios.map((audio, i) => (
            <GridListTile key={audio.id}>
              <img src={audio.img} alt={audio.title} />
              <GridListTileBar
                title={audio.title}
                subtitle={<span>by: {audio.artist}</span>}
                actionIcon={
                  <span>
                    { (audioId === audio.id && !playing) &&
                      <IconButton onClick={this.play} className={classes.button}>
                        <PlayCircleOutline />
                      </IconButton>
                    }
                    { (audioId === audio.id && playing) &&
                      <IconButton onClick={this.pause} className={classes.button}>
                        <PauseCircleOutline />
                      </IconButton>
                    }
                    { (audioId !== audio.id) &&
                      <IconButton onClick={() => this.playById(audio.id)} className={classes.button}>
                        <PlayCircleOutline />
                      </IconButton>
                    }
                  </span>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

AudiosGridList.defaultProps = {
  audios: [],
  playing: false
};

AudiosGridList.propTypes = {
  audios: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return state.playerData;
}

export default connect(mapStateToProps)(
  withStyles(styles)(AudiosGridList)
)
