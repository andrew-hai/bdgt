import React from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
  render() {
    const { songs } = this.props;
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
              key={tile.id}
              title={tile.title}
              subtitle={<span>by <b>{tile.artist}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
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
  songs: []
};

SongsGridList.propTypes = {
  songs: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return state.allSongs;
}

export default connect(mapStateToProps)(SongsGridList)
