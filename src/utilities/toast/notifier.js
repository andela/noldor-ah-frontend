import { ToastContainer, toast } from 'react-toastify';

/**
 * @method notifier
 * @param {*} message
 * @param {*} type
 * @return {*} JSX
 */
function notifier(message, type) {
  switch (type) {
  case 'success':
    return toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  case 'failure':
    return toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  default:
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  }
}
export { notifier, ToastContainer };
