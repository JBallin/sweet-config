import {
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
} from '../actions/signup.actions';

const initialState = {
  isLoading: false,
  showSignupError: false,
  errorMessage: '',
};

export default(state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true, invalidEmail: false };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, errorMessage: '', showSignupError: false,
      };
    case USER_SIGNUP_FAILED:
      return {
        ...state, isLoading: false, showSignupError: true, errorMessage: action.payload,
      };
    default:
      return state;
  }
};
