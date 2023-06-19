/// <reference types="react-scripts" />

interface Window {
  kakao: any;
}

interface IItem {
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
