import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import createSecureStore from "redux-persist-expo-securestore";

const storage = createSecureStore();

import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],

}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)