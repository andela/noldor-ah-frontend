import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import notificationReducer from './notification/notificationReducer';
import featureArticleReducer from './feature-article/featureArticleReducer';
import relatedArticleReducer from './related-article/relatedArticleReducer';
import allArticleReducer from './all-article/allArticleReducer';
import anArticle from './single-article/singleArticleReducer';
import categoriesListReducer from './categories-list/categoriesList';
import addBookmarkReducer from './bookmarks/addBookmarkReducer';
import createArticle from './create-article/createArticle';
import searchReducer from './search/searchReducer';
import viewBookmarkReducer from './view-bookmark/viewBookmarkReducer';


export default combineReducers({
  signup: signupReducer,
  login: loginReducer,
  notification: notificationReducer,
  featureArticleReducer,
  relatedArticleReducer,
  allArticleReducer,
  anArticle,
  categoriesListReducer,
  addBookmarkReducer,
  createArticle,
  search: searchReducer,
  viewBookmarkReducer
});
