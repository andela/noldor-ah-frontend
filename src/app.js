import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { simpleAction } from './actions/simpleAction';
import './static/stylesheets/app.scss';
import Route from './routes/Routes';


class App extends Component {
simpleAction = () => {
  this.props.simpleAction();
}

render() {
  return (
    <div>
      <h1 className="title" >Welcome to Authors Haven</h1>
      <pre>
        {
          JSON.stringify(this.props)
        }
      </pre>
      <Route />
      <button className="button" onClick={this.simpleAction}>Test redux action</button>
    </div>


  );
}
}
App.propTypes = {
  simpleAction: PropTypes.func
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
