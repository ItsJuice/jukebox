import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import history from './utils/browser-history';
import Root from './root-component';
import rootReducer from './root-reducer';
import configureStore from './store'
import { connectToChannel, subscribeToStream } from './sockets';

const initialState = {};

const appInit = () => {
  const store = configureStore(rootReducer, initialState);
  subscribeToStream({action: connectToChannel, store});
  const syncedHistory = syncHistoryWithStore(history, store);

  const rootElement = document.getElementById('main');
  document.body.appendChild(rootElement);

  render(<Root store={ store } history={ syncedHistory } />, rootElement);
};

document.addEventListener('DOMContentLoaded', appInit, false);
