import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../Redux/Stores";
import { useSelector } from "react-redux";
import { IPlace } from "../utils/types";
import { deletePlace, getPlace } from "../utils/placeFunctions";

export default function useDetail() {
  const [showMap, setShowMap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPlace | null>(null);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const userState = useSelector((state: RootState) => state.userReducer);

  const handleShowMap = () => {
    setShowMap((prev) => (prev === 1 ? 0 : 1));
  };

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      if (id) {
        const result = await getPlace(id);

        setData((prev) => result);

        if (result === null) {
          navigate("/notfound");
          return;
        }
      } else {
        navigate("/notfound");
        return;
      }

      setIsLoading((prev) => false);
    })();
  }, []);

  const handleRemovePlace = async (placeId: string) => {
    const status = await deletePlace(placeId, userState.userInfo._id);

    if (status === 200) {
      alert("삭제되었습니다.");
      navigate("/list");
      return;
    } else {
      alert("삭제에 실패했습니다.");
      return;
    }
  };

  return {
    id,
    isLoading,
    showMap,
    data,
    setShowMap,
    handleShowMap,
    userState,
    setUpdate,
    update,
    handleRemovePlace,
  };
}
