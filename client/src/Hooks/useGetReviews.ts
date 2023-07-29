import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { getVisitRecords } from "../utils/itemFunctions";
import { IReview } from "../utils/types";

export default function useGetReviews(id: string) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getVisitRecords(id);
      setReviews((prev) => result);

      setIsLoading((prev) => false);
    })();
  }, []);

  return { userState, isLoading, reviews };
}
