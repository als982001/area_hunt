import { useState } from "react";
import { IPlace } from "../utils/types";
import { useQuery } from "react-query";
import { getPlacesFromIndex } from "../utils/placeFunctions";

export default function useGetPlaces() {
  const count = 8;

  const [startIndex, setStartIndex] = useState(0);
  const { data, isLoading } = useQuery<IPlace[]>("places", () =>
    getPlacesFromIndex(startIndex)
  );

  return { data, isLoading };
}
