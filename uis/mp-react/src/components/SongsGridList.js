import React from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchSongs
} from '../actions/index'

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSongs())
  }

  render() {
    const { songs } = this.props
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          cols={5}
          style={styles.gridList}
        >
          <Subheader>Playlist</Subheader>
          {songs.map((tile) => (
            <GridTile
              key={tile.key}
              title={tile.name}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.img} alt={tile.name} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

SongsGridList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return state.songsLoad
}

export default connect(mapStateToProps)(SongsGridList)
