import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../css/App.css';
import { withStyles } from 'material-ui/styles';
import Player from '../components/Player'
import TopPanel from '../components/TopPanel'
import AudiosList from '../components/AudiosList'
import AudiosGridList from '../components/AudiosGridList'
import LabelBottomNavigation from '../components/LabelBottomNavigation'

import { connect } from 'react-redux'
import {
  fetchAudios,
  fetchUser
} from '../actions/index'

const styles = theme => ({
  content: {
    paddingTop: 75,
    margin: 'auto',
    maxWidth: 1100,
  }
});

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAudios());
    dispatch(fetchUser());
  }

  render() {
    const { view } = this.props.playerData;
    const { classes } = this.props;

    return (
      <div>
        <Player />
        <div className={classes.content}>
          <TopPanel />
          { view === 'list' &&
            <AudiosList />
          }
          { view === 'grid' &&
            <AudiosGridList />
          }
        </div>
        <LabelBottomNavigation />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(
  withStyles(styles)(App)
)
