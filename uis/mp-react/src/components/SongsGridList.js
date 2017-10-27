import React from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

import {
  playAudio
} from '../actions/index'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  //   overflowY: 'auto',
  // },
  gridList: {
    maxWidth: 1100
  }
};

class SongsGridList extends React.Component {
  play = (id) => {
    const { dispatch, audios } = this.props;
    const audioToPlay = audios.find(a => a.id === id);
    const index = audios.indexOf(audioToPlay);
    if (!!audioToPlay) {
      dispatch(playAudio(audioToPlay, index));
    }
  }

  render() {
    const { audios } = this.props;
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          cols={5}
          style={styles.gridList}
        >
          <Subheader>Playlist</Subheader>
          {audios.map((tile) => (
            <GridTile
              key={tile.id}
              title={tile.title}
              subtitle={<span>by <b>{tile.artist}</b></span>}
              actionIcon={<IconButton>
                <PlayArrow color="white" onClick={() => this.play(tile.id)} /></IconButton>
              }
            >
              <img src={tile.img} alt={tile.title} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

SongsGridList.defaultProps = {
  audios: []
};

SongsGridList.propTypes = {
  audios: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return state.allAudios;
}

export default connect(mapStateToProps)(SongsGridList)
