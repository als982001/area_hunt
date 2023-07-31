import { AUTH, LOGIN, LOGOUT } from "../Actions";

export interface UserState {
  login: Boolean;
  userInfo: IAccount | null;
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
      if (action.payload.userInfo) {
        return { login: true, userInfo: action.payload.userInfo };
      } else {
        return { login: false, userInfo: null };
      }
    default:
      return state;
  }
};

export default userReducer;
