import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../css/App.css';
import TopBar from '../components/TopBar'
import Player from '../components/Player'
import SongsGridList from '../components/SongsGridList'

import { connect } from 'react-redux'
import {
  fetchSongs
} from '../actions/index'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSongs());
  }

  render() {
    return (
      <div>
        <TopBar />
        <Player />
        <SongsGridList />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App)
