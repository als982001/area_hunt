import { useEffect, useState } from "react";
import { IAccount, IPlace, IReview } from "../utils/types";
import { useQuery } from "react-query";
import { getReviewsByUser } from "../utils/reviewFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";

export default function useMyReviews() {
  const userState = useSelector((state: RootState) => state.userReducer);

  const [showAll, setShowAll] = useState<boolean>(false);
  const { data, isLoading } = useQuery<IReview[]>("myReviews", () =>
    getReviewsByUser(userState.userInfo._id)
  );

  const getSliceIdx = () => {
    return showAll ? data?.length : 4;
  };

  return { showAll, setShowAll, isLoading, data, getSliceIdx };
}
