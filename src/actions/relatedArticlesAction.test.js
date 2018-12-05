/* eslint-disable max-len */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  loadRelatedArticles,
  loadingRelatedRequest,
  loadRelatedFailure, loadRelatedSuccess,
} from './relatedArticlesAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('', () => {
  afterEach(() => {
    mock.reset();
  });


  it('It fetch a related articles', () => {
    const article = [
      {
        readingTime: '3 min read',
        slug: 'slavery-e4a3061db678',
        title: 'Coming forth',
        description: 'description',
        content: 'the content',
        ratings: 5

      },
      {
        readingTime: '3 min read',
        slug: 'slavery-e4a3061db678',
        title: 'Coming forth',
        description: 'description',
        content: 'the content',
        ratings: 5
      },
      {
        readingTime: '3 min read',
        slug: 'slavery-e4a3061db678',
        title: 'Coming forth',
        description: 'description',
        content: 'the content',
        ratings: 5
      }
    ];

    mock.onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles').reply(200, {
      status: 'success',
      articles: article
    });


    const mockActions = [
      {
        type: 'LOAD_RELATED_REQUEST',
      },
      {
        type: 'LOAD_RELATED_SUCCESS', articles: article
      }
    ];

    const store = mockStore({ });
    return store.dispatch(loadRelatedArticles()).then(() => expect(store.getActions()).toEqual(mockActions));
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
        type: 'LOAD_RELATED_REQUEST'
      },
      {
        type: 'LOAD_RELATED_FAILURE', error
      }
    ];

    const store = mockStore({ });
    return store.dispatch(loadRelatedArticles()).then(() => expect(store.getActions()).toEqual(mockActions));
  });


  it('successfully load related articles', () => {
    const article = {};
    const expectedArticle = {
      type: 'LOAD_RELATED_SUCCESS',
      articles: article
    };
    const action = loadRelatedSuccess(article);
    expect(action).toEqual(expectedArticle);
  });

  it('failed loading of related articles', () => {
    const error = {};
    const errorArticle = {
      type: 'LOAD_RELATED_FAILURE',
      error
    };
    const action = loadRelatedFailure(error);
    expect(action).toEqual(errorArticle);
  });

  it('load feature failure', () => {
    const loadingArticle = {
      type: 'LOAD_RELATED_REQUEST',
    };
    const action = loadingRelatedRequest();
    expect(action).toEqual(loadingArticle);
  });

  it('load feature article', () => {

  });
});
