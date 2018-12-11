import { combineReducers } from 'redux';
import loginReducer from './login/loginReducer';
import notificationReducer from './notification/notificationReducer';

export default combineReducers({
  login: loginReducer,
  notification: notificationReducer,
});
