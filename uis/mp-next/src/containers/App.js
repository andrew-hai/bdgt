import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../css/App.css';
// import TopBar from '../components/TopBar'
import Player from '../components/Player'
import AudiosList from '../components/AudiosList'
import AudiosGridList from '../components/AudiosGridList'
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
    const { view } = this.props.playerData;

    return (
      <div>
        <Player />
        { view === 'list' &&
          <AudiosList />
        }
        { view === 'grid' &&
          <AudiosGridList />
        }
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
