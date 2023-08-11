import { useState } from "react";
import { IPlace } from "../utils/types";
import { getPlacesByUser } from "../utils/placeFunctions";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";

export default function useMyPlaces() {
  const userState = useSelector((state: RootState) => state.userReducer);

  const [showAll, setShowAll] = useState<boolean>(false);
  const { data, isLoading } = useQuery<IPlace[]>("myPlaces", () =>
    getPlacesByUser(userState.userInfo._id)
  );

  const getSliceIdx = () => {
    return showAll ? data?.length : 4;
  };

  return { showAll, setShowAll, isLoading, data, getSliceIdx };
}
