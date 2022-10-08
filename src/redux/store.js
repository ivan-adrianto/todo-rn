import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './index';

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
