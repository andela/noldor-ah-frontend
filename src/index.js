import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();
// const App = () => <div><center><h1>Welcome to Authors Haven</h1></center></div>;

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.querySelector('#app'));
