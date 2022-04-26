// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jokesReducer from '../features/jokes/jokesSlice';
import watchfetchJokes from './sagas'
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../features/counter/counterSlice';


const sagaMiddleware = createSagaMiddleware()

const reduxState = localStorage.getItem('reduxState')
const persistedState = {}//reduxState ? JSON.parse(reduxState) : {}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jokes: jokesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  preloadedState: persistedState
});

sagaMiddleware.run(watchfetchJokes)

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

////////////////////
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;



