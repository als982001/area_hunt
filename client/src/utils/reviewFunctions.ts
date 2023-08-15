import axios from "axios";
import { IReview } from "./types";
import mongoose from "mongoose";
import { toast } from "react-toastify";

export const getReviews = async (placeId: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/review/${placeId}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data);
    } else {
      toast.error("나중에 다시 시도해주세요.");
    }

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
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data);
    } else {
      toast.error("나중에 다시 시도해주세요.");
    }

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

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
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

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
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

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};
