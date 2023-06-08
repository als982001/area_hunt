import styled from "styled-components";
import Card from "../Components/List/Card";
import { displayCenter } from "../styles/displays";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useEffect, useRef } from "react";

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

const tempId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function List() {
  const btnRef = useRef(null);

  useEffect(() => {
    (async () => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log("카드 끝!");
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

  return (
    <Wrapper>
      <Cards>
        {tempId.map((id) => (
          <Card key={id + ""} id={id + ""} />
        ))}
      </Cards>
      <ToTop ref={btnRef}>
        <BsFillArrowUpSquareFill size={"100px"} />
      </ToTop>
    </Wrapper>
  );
}
