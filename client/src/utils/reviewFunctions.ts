import axios from "axios";
import { IReview } from "./types";
import mongoose from "mongoose";

export const getReviews = async (placeId: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/review/${placeId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getReviewsByUser = async (
  userId: mongoose.Types.ObjectId | string
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/review/user/${userId}`
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const postReview = async (
  placeId: string,
  userId: string,
  review: {
    imageUrl: string;
    name: string;
    content: string;
    date: string;
  }
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/review?placeId=${placeId}&userId=${userId}`,
      review,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteReview = async (
  _id: mongoose.Types.ObjectId | string,
  userId: mongoose.Types.ObjectId | string
) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACK}/review/delete?id=${_id}&userId=${userId}`
    );

    return response.status;
  } catch (error: any) {
    if (error.response.status) {
      return error.response.status;
    } else {
      return 400;
    }
  }
};

export const updateReview = async (
  updatedReview: IReview,
  userId: mongoose.Types.ObjectId | string
) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACK}/review/${updatedReview._id}`,
      { updatedReview, userId }
    );

    return response.status;
  } catch (error: any) {
    if (error.response.status) {
      return error.response.status;
    } else {
      return 400;
    }
  }
};
