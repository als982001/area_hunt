import axios from "axios";
import { IPlace } from "./types";
import mongoose from "mongoose";

export const getPlacesFromIndex = async (startIndex: string | number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/place/startIndex/${startIndex}`
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getPlacesByAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/place/address/${address}`
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
      `${process.env.REACT_APP_BACK}/place/user/${userId}`
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getPlace = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/place/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postPlace = async (
  place: {
    name: string;
    location: string;
    address: string;
    content: string;
    imageUrl: string;
  },
  userId: string
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACK}/place`,
      { place, publisherId: userId },
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

export const updatePlace = async (
  updatedPlace: IPlace,
  userId: string | mongoose.Types.ObjectId
) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACK}/place/${updatedPlace._id.toString()}`,
      { updatedPlace, userId },
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

export const deletePlace = async (
  placeId: string,
  userId: string | mongoose.Types.ObjectId
) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACK}/place/delete?id=${placeId}&userId=${userId}`
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

export const getPlacesByKeyword = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/place/search/${keyword}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
