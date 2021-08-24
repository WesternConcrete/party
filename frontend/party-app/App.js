import React from 'react';
import {store, persistor} from './js/redux/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


import MainTabNav from "./js/MainTabNav"
import MainStack from "./js/MainStack"

export default function App() {
  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>

  );
}

