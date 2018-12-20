import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../createArticleAction';
import * as types from '../../../types/createArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('create article actions test', () => {
  it('should handle create article begin', () => {
    expectedAction.type = types.CREATE_ARTICLE_BEGIN;
    expect(actions.createArticleBegin())
      .toEqual(expectedAction);
  });

  it('should handle trigger article draft success', () => {
    expectedAction.type = types.CREATE_DRAFT_SUCCESS;
    expectedAction.payload = {
      no: 'no',
      foo: 'foo',
    };
    expect(actions.triggerDraftSuccess({ no: 'no', foo: 'foo' })).toEqual(expectedAction);
  });

  it('should handle Trigger Draft Error', () => {
    expectedAction.type = types.CREATE_DRAFT_ERROR;
    expectedAction.payload = 'error';
    expect(actions.triggerDraftError('error'))
      .toEqual(expectedAction);
  });

  it('should handle create article Error', () => {
    expectedAction.type = types.CREATE_ARTICLE_ERROR;
    expectedAction.payload = 'error';
    expect(actions.createArticleError('error'))
      .toEqual(expectedAction);
  });

  describe('async create article action test', () => {
    it('should dispatch NOTIFY_SUCCESS and CREATE_DRAFT_SUCCESS when createArticleDraft is successful', () => {
      const mock = new MockAdapter(Axios);

      const article = {
        title: 'Power to females around the world',
        description: 'women needs to standup for what is right',
        content: 'An elaborate discussion on how women should uplift the world',
        category: 'self-improvement',
      };

      const mockData = {
        article: {
          title: 'Power to females around the world',
          description: 'women needs to standup for what is right',
          content: 'An elaborate discussion on how women should uplift the world',
          category: 'self-improvement',
        },
        message: 'draft saved'
      };

      mock.onPost('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles')
        .reply(200, mockData);

      const expectedActions = [
        { type: 'NOTIFY_SUCCESS', message: 'draft saved' },
        {
          payload: {
            title: 'Power to females around the world',
            description: 'women needs to standup for what is right',
            content: 'An elaborate discussion on how women should uplift the world',
            category: 'self-improvement',
          },
          type: types.CREATE_DRAFT_SUCCESS,
        }
      ];

      const store = mockStore({ article: {} });

      return store.dispatch(actions.createArticleDraft(article)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should trigger NOTIFY_ERROR and CREATE_DRAFT_ERROR when submiting draft', () => {
      const mock = new MockAdapter(Axios);
      const slug = 'our-relationships-are-mirrors-of-ourselves-2572589de8de';
      const article = {
        title: 'Power to females around the world',
        description: 'women needs to standup for what is right',
        content: 'An elaborate discussion on how women should uplift the world',
        category: 'self-improvement',
      };

      const mockData = {
        article: {
          title: 'Power to females around the world',
          description: 'women needs to standup for what is right',
          content: 'An elaborate discussion on how women should uplift the world',
        },
        error: 'e'
      };

      mock.onPut(`https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}`)
        .reply(400, mockData);

      const expectedActions = [
        { message: 'e', type: 'NOTIFY_ERROR' },
        { type: types.CREATE_DRAFT_ERROR, payload: 'e' },
      ];

      const store = mockStore({ article: {} });
      return store.dispatch(actions.createArticleDraft(article, slug)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should trigger CREATE_ARTICLE_BEGIN and NOTIFY_SUCCESS when submitted successfully', () => {
      const mock = new MockAdapter(Axios);
      const slug = 'our-relationships-are-mirrors-of-ourselves-2572589de8de';
      const article = {
        title: 'Power to females around the world',
        description: 'women needs to standup for what is right',
        content: 'An elaborate discussion on how women should uplift the world',
        category: 'self-improvement',
      };

      const mockData = {
        article: {
          title: 'Power to females around the world',
          description: 'women needs to standup for what is right',
          content: 'An elaborate discussion on how women should uplift the world',
          category: 'self-improvement',
        },
        message: 'created successfully'
      };

      mock.onPut(`https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}/publish`)
        .reply(200, mockData);

      const expectedActions = [
        { type: types.CREATE_ARTICLE_BEGIN },
        { type: 'NOTIFY_SUCCESS', message: 'created successfully' },
      ];

      const store = mockStore({ article: {} });
      return store.dispatch(actions.createArticle(article, slug)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should trigger NOTIFY_ERROR and CREATE_ARTICLE_ERROR when submitted successfully', () => {
      const mock = new MockAdapter(Axios);
      const slug = 'our-relationships-are-mirrors-of-ourselves-2572589de8de';
      const article = {
        title: 'Power to females around the world',
        description: 'women needs to standup for what is right',
        content: 'An elaborate discussion on how women should uplift the world',
        category: 'self-improvement',
      };

      const mockData = {
        article: {
          title: 'Power to females around the world',
          description: 'women needs to standup for what is right',
          content: 'An elaborate discussion on how women should uplift the world',
        },
        message: 'error'
      };

      mock.onPut(`https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}/publish`)
        .reply(400, mockData);

      const expectedActions = [
        { type: types.CREATE_ARTICLE_BEGIN },
        { message: 'error', type: 'NOTIFY_ERROR' },
        { type: types.CREATE_ARTICLE_ERROR, payload: 'error' },
      ];

      const store = mockStore({ article: {} });
      return store.dispatch(actions.createArticle(article, slug)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
