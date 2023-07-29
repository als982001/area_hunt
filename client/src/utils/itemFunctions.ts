import { isLocal, localAreaImagePath } from "./functions";
import axios from "axios";

interface IAreaData {
  name: string;
  location: string;
  address: string;
  content: string;
}

interface IUpdate {
  id: number;
  name: string;
  address: string;
  location: string;
  content: string;
  publisherId: string;
}

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/items`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

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

export const updateItem = async (image: File | string, data: IUpdate) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    const response = await axios.patch(
      `${process.env.REACT_APP_BACK}/items/${data.id}`,
      formData,
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

    console.log(response);

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
