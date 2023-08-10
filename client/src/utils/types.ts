import mongoose from "mongoose";

export interface IPlace {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
  name: string;
  address: string;
  location: string;
  content: string;
  publisherId: string;
  reviews: mongoose.Types.ObjectId[];
}

export interface IReview {
  _id: mongoose.Types.ObjectId;
  placeId: mongoose.Types.ObjectId;
  imageUrl: string;
  name: string;
  content: string;
  date: string;
}

export interface IAccount {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
  name: string;
  userId: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  places: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  __v?: any;
}

export interface IJoinInfo {
  imageUrl: string;
  name: string;
  userId: string;
  password: string;
  phone: string;
  email: string;
}
