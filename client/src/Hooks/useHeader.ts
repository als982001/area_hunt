import { useState } from "react";
import { getPlacesByKeyword } from "../utils/placeFunctions";
import { useNavigate } from "react-router-dom";

export default function useHeader() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSetKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleGetPlacesByKeyword = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return { keyword, handleSetKeyword, handleGetPlacesByKeyword };
}
