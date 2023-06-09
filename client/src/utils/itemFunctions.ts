import axios from "axios";

interface IAreaData {
  name: string;
  location: string;
  address: string;
  content: string;
}

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACK}/item`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getItem = async (id: string | number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/item/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handlePostItem = async (image: File, data: IAreaData) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("location", data.location);
    formData.append("content", data.content);

    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/item`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAreaImage = async (filename: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/images/${filename}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};
