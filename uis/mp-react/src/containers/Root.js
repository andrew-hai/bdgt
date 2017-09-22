import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import ThemeProvider from '../components/ThemeProvider'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider />
      </Provider>
    )
  }
}
