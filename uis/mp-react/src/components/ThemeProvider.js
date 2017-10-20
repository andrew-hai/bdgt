import React, { Component } from 'react';
import App from '../containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ThemeProvider extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    );
  }
}
