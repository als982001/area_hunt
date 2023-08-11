import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { IReview } from "../utils/types";
import { getReviews } from "../utils/reviewFunctions";

export default function useGetReviews(id: string) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getReviews(id);
      setReviews((prev) => result);

      setIsLoading((prev) => false);
    })();
  }, []);

  return { userState, isLoading, reviews };
}
