import React from 'react';
import store from './js/redux/store'
import {Provider} from 'react-redux'

import MainTabNav from "./js/MainTabNav"
import MainStack from "./js/MainStack"

export default function App() {
  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>

  );
}

