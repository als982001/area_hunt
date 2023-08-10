import { useEffect, useState } from "react";
import { IAccount, IPlace, IReview } from "../utils/types";
import { getReviewsByUser } from "../utils/itemFunctions";
import { useQuery } from "react-query";

export default function useMyReviews(userInfo: IAccount) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { data, isLoading } = useQuery<IReview[]>("myReviews", () =>
    getReviewsByUser(userInfo._id)
  );

  const getSliceIdx = () => {
    return showAll ? data?.length : 4;
  };

  return { showAll, setShowAll, isLoading, data, getSliceIdx };
}
