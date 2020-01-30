// import React from 'react';
// import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './articleRating';
import * as userActions from './userArticleRating';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let expectedAction = {};

describe('Should create the right actions', () => {
  beforeEach(() => {
    expectedAction = {};
  });
  it('Dispatch action success action', () => {
    expectedAction.type = 'RATE_ARTICLE_SUCCESS';
    expectedAction.rating = {
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 1
    };
    const actualAction = actions.rateArticleSuccess({
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 1
    });
    expect(actualAction).toEqual(expectedAction);
  });
  it('Dispatch action failure action', () => {
    expectedAction.type = 'RATE_ARTICLE_FAILURE';
    expectedAction.error = {
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 1
    };
    const actualAction = actions.rateArticleFailure({
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 1
    });
    expect(actualAction).toEqual(expectedAction);
  });
});

describe('Should dispatch the right action', () => {
  afterEach(() => {
    expectedAction = {};
  });
  it('should dispatch a success action', () => {
    const mock = new MockAdapter(Axios);

    const data = {
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 5
    };

    const mockData = {
      type: 'RATE_ARTICLE_SUCCESS'
    };

    mock
      .onPost(`https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/ratings/${data.id}`)
      .reply(201, mockData);

    const expectedActions = [{
      type: 'RATE_ARTICLE_SUCCESS',
    }];

    const store = mockStore({ data: {} });

    return store.dispatch(actions.rateArticles(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch a failure action', () => {
    const mock = new MockAdapter(Axios);

    const data = {
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      rateValue: 5
    };

    const error = 'Failed with status 404';
    const mockData = error;


    mock.onPost()
      .reply(404, mockData);

    const expectedActions = [{
      type: 'RATE_ARTICLE_FAILURE',
      error
    }];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.rateArticles(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// --User Rating--//
describe('Should create the right actions', () => {
  beforeEach(() => {
    expectedAction = {};
  });
  it('Dispatch action success action', () => {
    expectedAction.type = 'GET_RATE_SUCCESS';
    expectedAction.rating = {
      ratings: 1
    };
    const actualAction = userActions.getUserRatingSuccess({
      ratings: 1
    });
    expect(actualAction).toEqual(expectedAction);
  });
  it('Dispatch action failure action', () => {
    expectedAction.type = 'GET_RATE_FAILURE';
    expectedAction.error = {
      ratings: null
    };
    const actualAction = userActions.getUserRatingFailure({
      ratings: null
    });
    expect(actualAction).toEqual(expectedAction);
  });
});

describe('Should dispatch the right action', () => {
  afterEach(() => {
    expectedAction = {};
  });
  it('should dispatch a failure action', () => {
    const mock = new MockAdapter(Axios);

    const data = {
      id: '876a8da9-070a-4d7a-bfc7-016f9184866d',
      ratings: 5
    };

    const error = null;
    const mockData = error;


    mock.onPost()
      .reply(404, mockData);

    const expectedActions = [{
      type: 'GET_RATE_FAILURE',
      error
    }];

    const store = mockStore({ data: {} });
    return store.dispatch(userActions.getUserRating(data.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
