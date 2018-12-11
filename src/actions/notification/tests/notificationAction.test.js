import * as actions from '../notificationAction';
import * as types from '../../../types/notification';

const expectedAction = {};

describe('notification actions test', () => {
  it('should handle NOTIFICATION_SUCCESS', () => {
    expectedAction.type = types.NOTIFY_SUCCESS;
    expectedAction.message = 'success';

    expect(actions.notifySuccess('success')).toEqual(expectedAction);
  });

  it('should handle NOTIFICATION_ERROR', () => {
    expectedAction.type = types.NOTIFY_ERROR;
    expectedAction.message = 'error';

    expect(actions.notifyError('error')).toEqual(expectedAction);
  });

  it('should handle NOTIFICATION_CLEAR', () => {
    expectedAction.type = types.NOTIFY_CLEAR;
    delete (expectedAction.message);

    expect(actions.notifyClear()).toEqual(expectedAction);
  });
});
