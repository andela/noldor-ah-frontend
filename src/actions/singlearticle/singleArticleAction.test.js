/* eslint-disable max-len */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  loadAnArticle, loadingAnArticleRequest, loadAnArticleSuccess, loadAnArticleFailure
} from './singleArticleAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('', () => {
  afterEach(() => {
    mock.reset();
  });

  //   it('It fetch a single article', () => {
  //     const article = [
  //       {
  //         readingTime: '3 min read',
  //         slug: 'slavery-e4a3061db678',
  //         title: 'Coming forth',
  //         description: 'description',
  //         content: 'the content',
  //       }
  //     ];
  //     const serverError = new Error('Request failed with status code 404');
  //     mock.onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/61c11b83b02f').reply(200, {
  //       status: 'success',
  //       article
  //     });


  //     const mockActions = [
  //       {
  //         type: 'LOAD_AN_ARTICLE_REQUEST'
  //       },
  //       {
  //         type: 'LOAD_AN_ARTICLE_SUCCESS', article
  //       }
  //     ];

  //     const store = mockStore({ });
  //     return store.dispatch(loadAnArticle()).then(() => expect(store.getActions()).toEqual(mockActions));
  //   });

  it('It fail on single article request', () => {
    const serverError = new Error('Request failed with status code 404');
    const error = serverError;

    mock.onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/61c11b83b02e').reply(200, {
      status: 'success',
      error
    });

    const mockActions = [
      {
        type: 'LOAD_AN_ARTICLE_REQUEST'
      },
      {
        type: 'LOAD_AN_ARTICLE_FAILURE', error
      }
    ];

    const store = mockStore({ });
    return store.dispatch(loadAnArticle()).then(() => expect(store.getActions()).toEqual(mockActions));
  });

  it('load an article success', () => {
    const article = {};
    const expectedArticle = {
      type: 'LOAD_AN_ARTICLE_SUCCESS',
      article
    };
    const action = loadAnArticleSuccess(article);
    expect(action).toEqual(expectedArticle);
  });

  it('load an article  error', () => {
    const error = {};
    const errorArticle = {
      type: 'LOAD_AN_ARTICLE_FAILURE',
      error
    };
    const action = loadAnArticleFailure(error);
    expect(action).toEqual(errorArticle);
  });

  it('load an article failure', () => {
    const loadingArticle = {
      type: 'LOAD_AN_ARTICLE_REQUEST',
    };
    const action = loadingAnArticleRequest();
    expect(action).toEqual(loadingArticle);
  });

  it('load an article', () => {
  });
});
