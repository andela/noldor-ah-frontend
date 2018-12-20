import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './searchAction';
import * as types from '../../types/search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};
const baseURL = 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/';
const request = { keywords: 'smurf' };

describe('search actions tests', () => {
  it('should handle SEARCH_BEGIN', () => {
    expectedAction.type = types.SEARCH_BEGIN;
    expectedAction.payload = {
      keywords: 'keyword'
    };

    expect(actions.searchBegin({ keywords: 'keyword' }))
      .toEqual(expectedAction);
  });

  it('should handle SEARCH_SUCCESS', () => {
    expectedAction.type = types.SEARCH_SUCCESS;
    expectedAction.payload = [{
      foo: 'bar',
    }];

    expect(actions.searchSuccess([{ foo: 'bar' }]))
      .toEqual(expectedAction);
  });

  it('should handle CATEGORIES_LOADED', () => {
    expectedAction.type = types.CATEGORIES_LOADED;
    delete expectedAction.payload;

    expect(actions.categoriesLoaded()).toEqual(expectedAction);
  });

  it('should handle SET_KEYWORD', () => {
    expectedAction.type = types.SET_KEYWORD;
    expectedAction.payload = {
      keywords: 'coretta'
    };

    expect(actions.setKeyword({ keywords: 'coretta' })).toEqual(expectedAction);
  });

  describe('search async actions tests', () => {
    it('should handle a successful searchRequest', () => {
      const mock = new MockAdapter(Axios);
      const mockData = {
        articles: ['articles']
      };

      mock.onPost(`${baseURL}search`).reply(200, mockData);

      const expectedActions = [
        { type: 'SEARCH_BEGIN', payload: { keywords: 'smurf' } },
        { type: 'SEARCH_SUCCESS', payload: mockData.articles }
      ];

      const store = mockStore({ });

      return store.dispatch(actions.searchRequest(`${baseURL}search`, request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle a failed searchRequest', () => {
      const mock = new MockAdapter(Axios);
      const mockData = {
        success: false,
        message: 'gargamel won',
      };

      mock.onPost(`${baseURL}search`).reply(400, mockData);
      const store = mockStore({});
      const expectedActions = [
        { type: 'SEARCH_BEGIN', payload: { keywords: 'smurf' } },
        { type: 'SEARCH_FAILURE' }
      ];

      return store.dispatch(actions.searchRequest(`${baseURL}search`, request))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCategories() tests', () => {
      it('should handle getCategories success', () => {
        const mock = new MockAdapter(Axios);
        const mockData = {
          success: true,
          message: 'retrieved successfully',
          data: [
            'self-development',
            'travel',
            'health',
            'finance',
            'relationships',
            'science',
            'technology',
            'life'
          ]
        };

        mock.onGet().reply(200, mockData);

        const expectedActions = [
          {
            type: types.CATEGORIES_LOADED,
            payload: mockData.data
          }
        ];

        const store = mockStore({});

        return store.dispatch(actions.getCategories())
          .then(() => expect(store.getActions()).toEqual(expectedActions));
      });

      it('should handle getCategories failure', () => {
        const mock = new MockAdapter(Axios);
        const mockData = {
          success: true,
          message: 'retrieved successfully',
          data: undefined
        };

        mock.onGet().reply(200, mockData);

        const expectedActions = [];

        const store = mockStore({});

        return store.dispatch(actions.getCategories())
          .then(() => expect(store.getActions()).toEqual(expectedActions));
      });
    });

    describe('getAuthors() tests', () => {
      it('should handle getAuthors success', () => {
        const mock = new MockAdapter(Axios);
        const mockData = {
          success: true,
          message: [
            'successfully retrieved users list',
            [
              {
                id: 'id',
                username: 'anasey',
                email: 'anasey@outlook.com'
              },
            ]
          ],
        };

        mock.onGet().reply(200, mockData);

        const expectedActions = [
          {
            type: types.AUTHORS_LOADED,
            payload: mockData.message[1],
          }
        ];

        const store = mockStore({});

        return store.dispatch(actions.getAuthors())
          .then(() => expect(store.getActions()).toEqual(expectedActions));
      });

      it('should handle getAuthors failure', () => {
        const mock = new MockAdapter(Axios);
        const mockData = {
          success: true,
          message: [
            'successfully retrieved users list',
            undefined
          ],
        };

        mock.onGet().reply(200, mockData);

        const expectedActions = [];

        const store = mockStore({});

        return store.dispatch(actions.getAuthors())
          .then(() => expect(store.getActions()).toEqual(expectedActions));
      });
    });
  });
});
