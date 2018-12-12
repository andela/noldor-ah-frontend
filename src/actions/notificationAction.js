import { NOTIFY_SUCCESS, NOTIFY_ERROR, NOTIFY_CLEAR } from '../types/notification';

export const notifySuccess = message => ({
  type: NOTIFY_SUCCESS,
  message,
});

export const notifyError = message => ({
  type: NOTIFY_ERROR,
  message,
});

export const notifyClear = () => ({ type: NOTIFY_CLEAR });
