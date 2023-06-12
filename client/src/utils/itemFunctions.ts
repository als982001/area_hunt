import axios from "axios";

interface IAreaData {
  name: string;
  location: string;
  address: string;
  content: string;
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

export const getSomeItems = async (start: number, end: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/items/slice?start=${start}&end=${end}`
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

export const handlePostItem = async (image: File, data: IAreaData) => {
  try {
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
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAreaImage = async (filename: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/images/${filename}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getVisitRecords = async (areaId: string | number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/records/${areaId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postRecord = async (
  image: File,
  areaId: string | number,
  info: { content: string; name: string; date: string }
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return false;
  }
};
