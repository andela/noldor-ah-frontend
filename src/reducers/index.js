import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import featureArticleReducer from './featureArticleReducer';
import relatedArticleReducer from './relatedArticleReducer';
import allArticleReducer from './allArticleReducer';

export default combineReducers({
  simpleReducer,
  featureArticleReducer,
  relatedArticleReducer,
  allArticleReducer
});
