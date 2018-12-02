export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

const API_URL = process.env.REACT_APP_API;

export const userSignup = newUser => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_PENDING });
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const user = await response.json();
    if (user.error) throw user.error;
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: user,
    });
  } catch (err) {
    const errorMessage = err.messag || err;
    if (errorMessage.includes('gist')) {
      dispatch({ type: INVALID_GIST_ID });
    }
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: errorMessage,
    });
  }
};
