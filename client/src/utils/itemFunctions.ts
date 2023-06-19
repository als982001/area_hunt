import { localAreas } from "../Data/localAreas";
import { localReviews } from "../Data/localReviews";
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
    if (isLocal) {
      return localAreas;
    } else {
      const response = await axios.get(`${process.env.REACT_APP_BACK}/items`);

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getItemsByAddress = async (address: string) => {
  try {
    if (isLocal) {
      const data = localAreas.filter((area) => area.address.includes(address));
      return data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK}/items/address/${address}`
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getItem = async (id: string | number) => {
  try {
    if (isLocal) {
      return localAreas[+id];
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK}/items/${id}`
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handlePostItem = async (
  image: File | string,
  data: IAreaData,
  userId: string
) => {
  try {
    if (isLocal) {
      const newArea: IArea = {
        id: localAreas.length,
        image: {
          fieldname: "local_area_image",
          originalname: "local_area_image",
          encoding: "",
          mimetype: "",
          destination: "pixabay",
          filename: "local_area_image",
          path: localAreaImagePath,
          size: 1,
        },
        name: data.name,
        address: data.address,
        location: data.location,
        content: data.content,
        publisherId: userId,
      };

      localAreas.push(newArea);

      return true;
    } else {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("location", data.location);
      formData.append("content", data.content);

      await axios.post(`${process.env.REACT_APP_BACK}/items`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateItem = async (image: File | string, data: IUpdate) => {
  try {
    if (isLocal) {
      localAreas[data.id] = {
        image: {
          fieldname: "local_area_image",
          originalname: "local_area_image",
          encoding: "",
          mimetype: "",
          destination: "pixabay",
          filename: "local_area_image",
          path: localAreaImagePath,
          size: 1,
        },
        ...data,
      };

      return true;
    } else {
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
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getVisitRecords = async (areaId: string | number) => {
  try {
    if (isLocal) {
      const reviews = localReviews.filter(
        (review) => review.areaId === +areaId
      );
      return reviews;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK}/records/${areaId}`
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postRecord = async (
  image: File | string,
  areaId: string | number,
  info: { content: string; name: string; date: string }
) => {
  try {
    if (isLocal) {
      localReviews.push({
        id: localReviews.length,
        areaId: +areaId,
        imgPath: image as string,
        name: info.name,
        content: info.content,
        date: info.date,
      });

      return true;
    } else {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("info", JSON.stringify(info));
      formData.append("areaId", JSON.stringify(areaId));

      const response = await axios.post(
        `${process.env.REACT_APP_BACK}/records/${areaId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getItemsByKeyword = async (keyword: string) => {
  try {
    if (isLocal) {
      const searched = localAreas.filter(
        (area) => area.name.includes(keyword) || area.content.includes(keyword)
      );

      return searched;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK}/items/search?keyword=${keyword}`
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
