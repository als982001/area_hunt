import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getItemsByAddress } from "../utils/itemFunctions";

export default function useHandleCardsAnimation(location: string) {
  const offset = 3;

  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  const [boxNum, setBoxNum] = useState(0);

  const { data, isLoading } = useQuery<IArea[]>(`${location}Items`, () =>
    getItemsByAddress(location)
  );

  const getNextCards = () => {
    setBack(false);
    setVisible((prev) => (data ? (prev === boxNum ? boxNum : prev + 1) : 0));
  };

  const getPreviosCards = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  useEffect(() => {
    setBoxNum(Math.floor((data?.length as number) / offset));
  }, [data]);

  const getMaxCardCount = (visible: number): number => {
    if (data === undefined) {
      return 0;
    }
    return data.length - visible * offset;
  };

  return {
    isLoading,
    data,
    back,
    visible,
    getMaxCardCount,
    getNextCards,
    getPreviosCards,
  };
}
