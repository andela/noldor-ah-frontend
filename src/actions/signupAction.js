import axiosRequest from '../utilities/axiosRequest';
import routhPath from '../utilities/routePath';
import {
  SIGNUP_USER,
} from '../types/signup';

const triggerUserSignup = response => ({
  type: SIGNUP_USER,
  payload: response,
});

const signupAction = (dispatch, user) => {
  console.log('user passed is', user);
  // dispatch(triggerUserSignup());

  // Make api request to user signup route

  axiosRequest.post(routhPath.user.signup, user)
    .then((data) => {
    // then on sucessful response
      // Passing in the user's data as payload
      console.log('response data from ', data);
      dispatch(triggerUserSignup(data));
    })
    .catch((error) => {
    // catch any error and pass in the error
      dispatch(triggerUserSignup(error));
    });
};

export default triggerUserSignup;
