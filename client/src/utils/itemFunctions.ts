import axios from "axios";

export const handlePostItem = async (formData: FormData) => {
  try {
    const response = await axios.post("http://localhost:4000/item", {
      formData,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
  return true;
};
