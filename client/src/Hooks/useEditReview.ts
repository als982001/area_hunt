import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { IReview } from "../utils/types";
import mongoose from "mongoose";
import { removeReview } from "../utils/itemFunctions";

export default function useEditReview(review: IReview) {
  const [bigImg, setBigImg] = useState(false);
  const [update, setUpdate] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);

  const handleBigImg = (isBig: boolean) => {
    setBigImg((prev) => isBig);
  };

  const handleRemoveReview = async (_id: mongoose.Types.ObjectId | string) => {
    const status = await removeReview(_id);

    if (status === 204) {
      alert("삭제에 성공했습니다.");
      window.location.reload();
    }
  };

  return {
    bigImg,
    handleBigImg,
    userState,
    handleRemoveReview,
    update,
    setUpdate,
  };
}
