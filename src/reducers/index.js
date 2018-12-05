import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import featureArticleReducer from './featureArticleReducer';
import relatedArticleReducer from "./relatedArticleReducer";

export default combineReducers({
  simpleReducer,
  featureArticleReducer,
  relatedArticleReducer

});
