import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';
import PauseCircleOutline from 'material-ui-icons/PauseCircleOutline';
import ViewList from 'material-ui-icons/ViewList';

import {
  play,
  pause,
  playByIndex,
  toView
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
    maxWidth: 1100,
    paddingTop: 64
  },
  textRight: {
    textAlign: 'right'
  }
});

class AudiosGridList extends React.Component {
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
    dispatch(toView('list'));
  }

  render() {
    const { audios, audioIndex, playing } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridList cellHeight={180} className={classes.gridList} cols={5}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <Subheader component="div">Whole Playlist</Subheader>
          </GridListTile>
          <GridListTile key="Viewicon" className={classes.textRight} style={{ height: 'auto' }}>
            <IconButton onClick={() => this.toView()}>
              <ViewList color="rgba(0, 0, 0, 0.8)" />
            </IconButton>
          </GridListTile>
          {audios.map((audio, i) => (
            <GridListTile key={audio.id}>
              <img src={audio.img} alt={audio.title} />
              <GridListTileBar
                title={audio.title}
                subtitle={<span>by: {audio.artist}</span>}
                actionIcon={
                  <span>
                    { (audioIndex === audio.index && !playing) &&
                      <IconButton onClick={this.play}>
                        <PlayCircleOutline color="rgba(255, 255, 255, 1)" />
                      </IconButton>
                    }
                    { (audioIndex === audio.index && playing) &&
                      <IconButton onClick={this.pause}>
                        <PauseCircleOutline color="rgba(255, 255, 255, 1)" />
                      </IconButton>
                    }
                    { (audioIndex !== audio.index) &&
                      <IconButton onClick={() => this.playByIndex(audio.index)}>
                        <PlayCircleOutline color="rgba(255, 255, 255, 1)" />
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
