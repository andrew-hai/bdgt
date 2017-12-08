import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui-icons/PlayCircleOutline';
import PauseCircleOutline from 'material-ui-icons/PauseCircleOutline';
import ViewList from 'material-ui-icons/ViewList';

import Input, { InputAdornment }from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import SearchIcon from 'material-ui-icons/Search';

import {
  play,
  pause,
  playById,
  toView,
  filter
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
    dispatch(toView('list'));
  }

  filter = (event) => {
    const { dispatch } = this.props;
    dispatch(filter(event.target.value));
  }

  render() {
    const { audios, audioId, playing, filterStr } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridList cellHeight={180} className={classes.gridList} cols={5}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
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
                    { (audioId === audio.id && !playing) &&
                      <IconButton onClick={this.play}>
                        <PlayCircleOutline color="rgba(255, 255, 255, 1)" />
                      </IconButton>
                    }
                    { (audioId === audio.id && playing) &&
                      <IconButton onClick={this.pause}>
                        <PauseCircleOutline color="rgba(255, 255, 255, 1)" />
                      </IconButton>
                    }
                    { (audioId !== audio.id) &&
                      <IconButton onClick={() => this.playById(audio.id)}>
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
  filterStr: '',
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
