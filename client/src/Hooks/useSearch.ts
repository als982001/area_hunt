import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getPlacesByKeyword } from "../utils/placeFunctions";
import { IPlace } from "../utils/types";
import { useEffect } from "react";

export default function useSearch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    console.log(`keyword: ${keyword}`);
  }, [queryParams]);

  const { data, isLoading } = useQuery<IPlace[]>(
    ["placesByKeyword", keyword],
    () => getPlacesByKeyword(keyword as string)
  );

  return { keyword, data, isLoading };
}
