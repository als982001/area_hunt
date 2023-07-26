import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { getVisitRecords } from "../utils/itemFunctions";

interface IRecord {
  id: number;
  areaId: number;
  imgPath: string;
  name: string;
  content: string;
  date: string;
}

export default function useGetReviews(id: string | number) {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getVisitRecords(id);
      setRecords((prev) => result);

      setIsLoading((prev) => false);
    })();
  }, []);

  return { userState, isLoading, records };
}
