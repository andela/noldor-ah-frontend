import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import notificationReducer from './notification/notificationReducer';
import featureArticleReducer from './featureArticle/featureArticleReducer';
import relatedArticleReducer from './relatedArticle/relatedArticleReducer';
import allArticleReducer from './allArticle/allArticleReducer';


export default combineReducers({
  signup: signupReducer,
  login: loginReducer,
  notification: notificationReducer,
  featureArticleReducer,
  relatedArticleReducer,
  allArticleReducer
});
