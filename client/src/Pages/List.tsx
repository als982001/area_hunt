import styled from "styled-components";

import ToTopButton from "../Components/Global/Buttons/ToTopButton";
import useGetPlaces from "../Hooks/useGetPlaces";
import Card from "../Components/List/Card";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  width: 100%;
  padding: 0 100px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  row-gap: 100px;
`;

export default function List() {
  const options = {
    threshold: 1,
  };

  const { places, isLoading, addIndex } = useGetPlaces();

  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(addIndex, options);
    observer.observe(bottomRef.current as any);
  }, []);

  return (
    <Wrapper>
      <Title>등록된 모든 장소들</Title>
      {isLoading ? (
        <h1>로딩중...</h1>
      ) : (
        <Container>
          {places?.map((place) => (
            <Card place={place} mypage={false} key={place._id.toString()} />
          ))}
        </Container>
      )}
      <ToTopButton onClick={() => window.scrollTo(0, 0)} ref={bottomRef} />
    </Wrapper>
  );
}
