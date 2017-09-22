import React, { Component } from 'react';
import '../css/App.css';
import TopBar from './TopBar'
import Player from './Player'
import SongsGridList from './SongsGridList'

export default class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Player />
        <SongsGridList isFetching={true} songs={[]} />
      </div>
    );
  }
}
