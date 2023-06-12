import { AUTH, LOGIN, LOGOUT } from "../Actions";

export interface UserState {
  login: Boolean;
  userInfo: {
    userId: string;
    email: string;
  } | null;
}

const initState: UserState = {
  login: false,
  userInfo: null,
};

const userReducer = (state: UserState = initState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { login: true, userInfo: action.payload?.userInfo };
    case LOGOUT:
      return { login: false, userInfo: null };
    case AUTH:
      if (action.payload.userInfo === null) {
        return { login: false, userInfo: null };
      } else {
        return { login: true, userInfo: action.payload.userInfo };
      }
    default:
      return state;
  }
};

export default userReducer;
