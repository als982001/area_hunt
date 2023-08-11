import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { IReview } from "../utils/types";
import mongoose from "mongoose";
import { getImageUrl } from "../utils/functions";
import { deleteReview, updateReview } from "../utils/reviewFunctions";

export default function useEditReview(review: IReview) {
  const [bigImg, setBigImg] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatedContent, setUpdatedContent] = useState<string>(review.content);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(review.imageUrl);

  const userState = useSelector((state: RootState) => state.userReducer);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleBigImg = (isBig: boolean) => {
    setBigImg((prev) => isBig);
  };

  const handleInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleDeleteReview = async (_id: mongoose.Types.ObjectId | string) => {
    const status = await deleteReview(_id, userState.userInfo._id);

    if (status === 204) {
      alert("삭제에 성공했습니다.");
      window.location.reload();
    }
  };

  const handleUpdateReview = async () => {
    if (imageUrl !== review.imageUrl && image) {
      const uploadedImageUrl = await getImageUrl(image.name, image);

      if (uploadedImageUrl === null) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }

      review.imageUrl = uploadedImageUrl;
    }

    const updatedReview = { ...review, content: updatedContent };

    const status = await updateReview(updatedReview, userState.userInfo._id);

    if (status === 200) {
      alert("수정되었습니다.");
      window.location.reload();
      return;
    } else {
      alert("수정이 실패했습니다.");
      return;
    }
  };

  const handleImagePost = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];

    setImage(imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  return {
    bigImg,
    handleBigImg,
    userState,
    handleDeleteReview,
    update,
    setUpdate,
    updatedContent,
    setUpdatedContent,
    handleUpdateReview,
    imageInputRef,
    handleInputClick,
    handleImagePost,
    imageUrl,
  };
}
