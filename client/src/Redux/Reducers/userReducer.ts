import { AUTH, LOGIN, LOGOUT } from "../Actions";

export interface UserState {
  login: Boolean;
  userInfo: {
    userId: string;
    email: string;
    phone: string;
    userImg: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
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
