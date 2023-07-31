import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getImageUrl, isLocal } from "../utils/functions";
import { updateItem } from "../utils/itemFunctions";
import { IPlace } from "../utils/types";

export default function useUpdate(data: IPlace) {
  const [image, setImage] = useState<File | null>(null);
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

  const handleStartUpdate = async (event: { [key: string]: string }) => {
    if (image) {
      const newImageUrl = await getImageUrl(image.name, image);

      if (newImageUrl) {
        setImageUrl(newImageUrl);
      } else {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    const updatedPlace: IPlace = {
      _id: data._id,
      imageUrl,
      name: event.name,
      address: event.address,
      location: event.location,
      content: event.content,
      publisherId: data.publisherId,
      reviews: data.reviews,
    };

    const success = await updateItem(updatedPlace);

    if (success) {
      window.location.reload();
    } else {
      alert("정보가 업데이트되지 않았습니다.");
    }
    return;
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
