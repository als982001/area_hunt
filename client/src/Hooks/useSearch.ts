import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlacesByKeyword } from "../utils/placeFunctions";
import { IPlace } from "../utils/types";

export default function useSearch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const navigate = useNavigate();

  const goToList = () => {
    navigate("/list");
  };

  const { data, isLoading } = useQuery<IPlace[]>(
    ["placesByKeyword", keyword],
    () => getPlacesByKeyword(keyword as string)
  );

  return { keyword, data, isLoading, goToList };
}
