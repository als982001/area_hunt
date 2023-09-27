import { useEffect, useRef, useState } from "react";
import { IPlace } from "../utils/types";
import { getPlacesFromIndex } from "../utils/placeFunctions";

export default function useGetPlaces() {
  const count = 8;

  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<IPlace[]>([]);

  const finishInitSetting = useRef(false);
  const isAdding = useRef(true);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const data = await getPlacesFromIndex(startIndex);
      setPlaces((prev) => [...prev, ...data]);

      setIsLoading((prev) => false);

      finishInitSetting.current = true;
      isAdding.current = false;
    })();
  }, []);

  const addIndex = () => {
    if (isAdding.current === false && finishInitSetting.current === true) {
      isAdding.current = true;

      setStartIndex((prevIndex) => prevIndex + count);

      isAdding.current = false;
    }
  };

  useEffect(() => {
    (async () => {
      if (finishInitSetting.current === true) {
        const data = await getPlacesFromIndex(startIndex);
        setPlaces((prev) => [...prev, ...data]);
      }
    })();
  }, [startIndex]);

  return { places, addIndex, isLoading };
}
