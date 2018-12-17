import { combineReducers } from 'redux';
import signupReducer from './Signup/signupReducer';
import loginReducer from './Login/loginReducer';
import notificationReducer from './Notification/notificationReducer';
import featureArticleReducer from './Feature-Article/featureArticleReducer';
import relatedArticleReducer from './Related-Article/relatedArticleReducer';
import allArticleReducer from './All-Article/allArticleReducer';
import anArticle from './Single-Article/singleArticleReducer';


export default combineReducers({
  signup: signupReducer,
  login: loginReducer,
  notification: notificationReducer,
  featureArticleReducer,
  relatedArticleReducer,
  allArticleReducer,
  anArticle
});
