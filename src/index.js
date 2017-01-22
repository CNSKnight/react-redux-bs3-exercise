import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import App, { apptsApp } from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let store = createStore(apptsApp);

ReactDOM.render(
  // uggh - provider does nothing in pf mode
  <Provider store={store}>
    <App store={store}/>
  </Provider>,

  document.getElementById('root')
);
