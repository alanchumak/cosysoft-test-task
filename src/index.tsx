import React from 'react';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
// import { JokeList } from './JokeList';
// import { ReadingList } from './ReadingList';
import {App} from './App'
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';


const container = document.getElementById('root')!;
const root = createRoot(container);

Modal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();