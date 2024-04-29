import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userApi } from './services/userService.js';
import { billApi } from './services/billService.js';

// initial state of the store
const initialState = {
  token: null,
};

// Combine the reducers, including the logout reducer
const combinedReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [billApi.reducerPath]: billApi.reducer,
});

// Create the Redux store with the root reducer
const store = configureStore({
  reducer: combinedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(billApi.middleware)
});

export default store;
