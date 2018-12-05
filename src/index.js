import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes/Routes';
import { Header, Footer } from './components/common';

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Header />
      <Routes />
      <Footer />

    </div>

  </Provider>
), document.getElementById('app'));
