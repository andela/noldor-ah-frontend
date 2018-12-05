/* eslint-disable max-len */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  loadFeatureArticle, loadingFeatureRequest, loadFeatureSuccess, loadFeatureFailure
} from './featureArticleAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('', () => {
  afterEach(() => {
    mock.reset();
  });

  it('It fetch a single article', () => {
    const articles = [
      {
        readingTime: '3 min read',
        slug: 'slavery-e4a3061db678',
        title: 'Coming forth',
        description: 'description',
        content: 'the content',
      }
    ];

    mock.onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles').reply(200, {
      status: 'success',
      articles
    });


    const mockActions = [
      {
        type: 'LOAD_FEATURE_REQUEST'
      },
      {
        type: 'LOAD_FEATURE_SUCCESS', articles: articles[0]
      }
    ];

    const store = mockStore({ });
    return store.dispatch(loadFeatureArticle()).then(() => expect(store.getActions()).toEqual(mockActions));
  });

  it('It fail on single article request', () => {
    const serverError = new Error('Request failed with status code 500');
    const error = serverError;

    mock.onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles').reply(500, {
      status: 'success',
      error
    });

    const mockActions = [
      {
        type: 'LOAD_FEATURE_REQUEST'
      },
      {
        type: 'LOAD_FEATURE_FAILURE', error
      }
    ];

    const store = mockStore({ });
    return store.dispatch(loadFeatureArticle()).then(() => expect(store.getActions()).toEqual(mockActions));
  });

  it('load feature success', () => {
    const article = {};
    const expectedArticle = {
      type: 'LOAD_FEATURE_SUCCESS',
      articles: article
    };
    const action = loadFeatureSuccess(article);
    expect(action).toEqual(expectedArticle);
  });

  it('load feature error', () => {
    const error = {};
    const errorArticle = {
      type: 'LOAD_FEATURE_FAILURE',
      error
    };
    const action = loadFeatureFailure(error);
    expect(action).toEqual(errorArticle);
  });

  it('load feature failure', () => {
    const loadingArticle = {
      type: 'LOAD_FEATURE_REQUEST',
    };
    const action = loadingFeatureRequest();
    expect(action).toEqual(loadingArticle);
  });

  it('load feature article', () => {
  });
});
