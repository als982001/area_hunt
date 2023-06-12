import styled from "styled-components";
import Card from "../Components/List/Card";
import { displayCenter } from "../styles/displays";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { getAllItems, getSomeItems } from "../utils/itemFunctions";

const Wrapper = styled.div`
  width: 100%;
`;

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 50px;
  margin-top: 50px;
`;

const ToTop = styled.div`
  ${displayCenter}
  width: 100%;
  margin-top: 100px;
`;

// 관측에 적용할 수 있는 옵션
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

interface IItem {
  id: number;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
  name: string;
  address: string;
  location: string;
  content: string;
}

const offset = 8;

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IItem[]>([]);
  const [startIdx, setStartIdx] = useState(100);
  const [isEnd, setIsEnd] = useState(false);

  const btnRef = useRef(null);

  useEffect(() => {
    (async () => {
      const observer = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting) {
          const result = await getSomeItems(startIdx, startIdx + offset);
          setStartIdx((prev) => prev + offset);

          if (result.length === 0) {
            setIsEnd((prev) => true);
          } else {
            setStartIdx((prev) => prev + offset);
          }

          console.log(result);
        }
      }, options);

      if (btnRef.current) {
        observer.observe(btnRef.current);
      }

      return () => {
        observer.disconnect();
      };
    })();
  }, [btnRef]);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getSomeItems(startIdx, startIdx + offset);

      if (result.length === 0) {
        setIsEnd((prev) => true);
      } else {
        setStartIdx((prev) => prev + offset);
      }

      setData((prev) => result);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Cards>
          {data.map((item) => (
            <Card key={item.id + ""} item={item} />
          ))}
        </Cards>
      )}
      <ToTop ref={btnRef}>
        <BsFillArrowUpSquareFill size={"100px"} />
      </ToTop>
    </Wrapper>
  );
}
