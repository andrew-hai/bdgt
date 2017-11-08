import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../css/App.css';
// import TopBar from '../components/TopBar'
import Player from '../components/Player'
import SongsGridList from '../components/SongsGridList'
import LabelBottomNavigation from '../components/LabelBottomNavigation'

import { connect } from 'react-redux'
import {
  fetchAudios
} from '../actions/index'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAudios());
  }

  render() {
    return (
      <div>
        <Player />
        <SongsGridList />
        <LabelBottomNavigation />
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
