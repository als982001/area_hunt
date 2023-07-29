import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isLocal } from "../utils/functions";
import { updateItem } from "../utils/itemFunctions";
import { IPlace } from "../utils/types";

export default function useUpdate(data: IPlace) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.name,
      address: data.address,
      location: data.location,
      content: data.content,
    },
  });

  const handleStartUpdate = async (event: any) => {
    console.log("나중에");
    return;
    /*
    const { name, address, location, content } = event;

    const updatedInfo = {
      id: data.id,
      name,
      address,
      location,
      content,
      publisherId: data.publisherId,
    };

    if (isLocal) {
      const success = await updateItem(imageUrl, updatedInfo);

      if (success) {
        navigate("/list");
      } else {
        alert("정보가 업데이트되지 않았습니다.");
      }
    } else {
      if (image === null) {
        alert("이미지를 수정해주세요.");
        return;
      }

      const success = await updateItem(image, updatedInfo);

      if (success) {
        window.location.reload();
      } else {
        alert("정보가 업데이트되지 않았습니다.");
      }
    }

    return;
    */
  };

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  return {
    handleSubmit,
    handleStartUpdate,
    imageUrl,
    handleImagePost,
    register,
  };
}
