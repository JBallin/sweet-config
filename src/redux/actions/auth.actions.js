import { API_FETCH_FAILED } from '../reducers/api.reducers';

export const TOKEN_LOGIN_PENDING = 'TOKEN_LOGIN_PENDING';
export const TOKEN_LOGIN_SUCCESS = 'TOKEN_LOGIN_SUCCESS';
export const TOKEN_LOGIN_FAILED = 'TOKEN_LOGIN_FAILED';

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_PENDING = 'USER_LOGOUT_PENDING';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

const API_URL = process.env.REACT_APP_API;

export const tokenLogin = () => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_LOGIN_PENDING });
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
    });
    const userObject = await response.json();
    if (userObject.error) throw userObject.error;
    dispatch({
      type: TOKEN_LOGIN_SUCCESS,
      payload: userObject,
    });
  } catch (err) {
    if (err instanceof TypeError) {
      dispatch({
        type: API_FETCH_FAILED,
      });
    } else {
      dispatch({
        type: TOKEN_LOGIN_FAILED,
        payload: err.message || err,
      });
    }
  }
};

export const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_PENDING });
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const userObject = await response.json();
    if (userObject.error) throw userObject.error;
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userObject,
    });
  } catch (err) {
    if (err instanceof TypeError) {
      dispatch({
        type: API_FETCH_FAILED,
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err.message || err,
      });
    }
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_PENDING });
    const res = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.status !== 205) {
      const parsedRes = await res.json();
      if (parsedRes.error) throw parsedRes.error;
    }
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: USER_LOGOUT_FAILED,
      payload: err.message || err,
    });
  }
};