import { NOTIFY_SUCCESS, NOTIFY_ERROR, NOTIFY_CLEAR } from '../../types/notification';

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case NOTIFY_SUCCESS:
    return {
      type: 'success',
      message: action.message,
    };

  case NOTIFY_ERROR:
    return {
      type: 'error',
      message: action.message,
    };

  case NOTIFY_CLEAR:
    return {};

  default:
    return state;
  }
};

export default notificationReducer;
