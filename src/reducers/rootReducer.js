import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  login: loginReducer,
  notification: notificationReducer,
});
