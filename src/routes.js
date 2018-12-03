import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const NotFound = () => <div>404</div>;

const Routes = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Router>
);

export default Routes;
