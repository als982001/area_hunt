import { useEffect, useState } from "react";
import { IAccount, IPlace } from "../utils/types";
import { getPlacesByUser } from "../utils/itemFunctions";
import { useQuery } from "react-query";

export default function useMyPlaces(userInfo: IAccount) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { data, isLoading } = useQuery<IPlace[]>("myPlaces", () =>
    getPlacesByUser(userInfo._id)
  );

  const getSliceIdx = () => {
    return showAll ? data?.length : 4;
  };

  return { showAll, setShowAll, isLoading, data, getSliceIdx };
}
