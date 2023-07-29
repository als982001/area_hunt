/// <reference types="react-scripts" />

interface Window {
  kakao: any;
}

interface IArea {
  id: number;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
  name: string;
  address: string;
  location: string;
  content: string;
  publisherId: string;
}

interface IAccount {
  id: number;
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
  userId: string;
  password: string;
  name: string;
  phone: string;
  email: string;
}
