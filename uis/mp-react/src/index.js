import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

// import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/index.css';

injectTapEventPlugin();

render(
  <Root />,
  document.getElementById('root')
);
// registerServiceWorker();
