import React, { Component } from 'react';
import { Header, Footer } from './components/common';
import Route from './routes/Routes';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route />
        <Footer />
      </div>


    );
  }
}


export default App;
