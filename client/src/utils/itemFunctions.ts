import axios, { AxiosError, isAxiosError } from "axios";
import { IPlace, IReview } from "./types";
import mongoose from "mongoose";

interface IAreaData {
  name: string;
  location: string;
  address: string;
  content: string;
}

export const getItemsByAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/items/address/${address}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPlacesByUser = async (
  userId: mongoose.Types.ObjectId | string
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/items/user/${userId}`
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getItem = async (id: string | number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/items/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handlePostItem = async (
  imageUrl: string,
  data: IAreaData,
  userId: string
) => {
  try {
    const newPlace = { imageUrl, publisherId: userId, ...data };

    await axios.post(`${process.env.REACT_APP_BACK}/items`, newPlace, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateItem = async (updatedPlace: IPlace) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACK}/items/${updatedPlace._id.toString()}`,
      updatedPlace,
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

export const removePlace = async (placeId: string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACK}/items/delete?id=${placeId}`
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

export const getVisitRecords = async (placeId: string) => {
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

export const postRecord = async (
  placeId: string,
  review: {
    imageUrl: string;
    name: string;
    content: string;
    date: string;
  }
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/review/${placeId}`,
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

export const getItemsByKeyword = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/items/search?keyword=${keyword}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const removeReview = async (_id: mongoose.Types.ObjectId | string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACK}/review/delete?_id=${_id}`
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

export const updateReview = async (updatedReview: IReview) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACK}/review/${updatedReview._id}`,
      updatedReview
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
