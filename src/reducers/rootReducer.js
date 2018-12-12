import { combineReducers } from 'redux';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import notificationReducer from './notification/notificationReducer';

export default combineReducers({
  signup: signupReducer,
  login: loginReducer,
  notification: notificationReducer,
});
