import styled from "styled-components";

import Card from "./Card";
import { border1px, borderRadius20px } from "../../styles/styles";
import { activeShadow, buttonShadow } from "../../styles/shadows";

interface IProps {
  keyword: string;
  searchResult: IArea[];
  setSearchResult: React.Dispatch<React.SetStateAction<IArea[]>>;
  setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 200px;
  height: 100px;

  @media screen and (max-width: 1000px) {
    height: 200px;
    flex-direction: column;
    padding: 0;
    justify-content: space-around;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 0 50px;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  row-gap: 100px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ClearButton = styled.button`
  ${border1px}
  ${borderRadius20px}
  ${buttonShadow}
  
  width: 100px;
  height: 60px;
  background-color: #c4b0ff;
  color: #11009e;
  font-size: 15px;
  font-weight: bold;

  &:active {
    ${activeShadow}
  }

  font-weight: bold;
  color: white;
  border-radius: 2rem;
  width: 95.02px;
  height: 42.66px;
  border: none;
  background-color: #3653f8;
  display: flex;
  justify-content: center;
  align-items: center;

  & .span-mother {
    display: flex;
    overflow: hidden;
  }

  &:hover .span-mother {
    position: absolute;
  }

  &:hover .span-mother span {
    transform: translateY(1.2em);
  }

  & .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  & .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  & .span-mother span:nth-child(3) {
    transition: 0.4s;
  }

  & .span-mother span:nth-child(4) {
    transition: 0.5s;
  }

  & .span-mother span:nth-child(5) {
    transition: 0.6s;
  }

  & .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
  }

  & .span-mother2 span {
    transform: translateY(-1.2em);
  }

  &:hover .span-mother2 span {
    transform: translateY(0);
  }

  & .span-mother2 span {
    transition: 0.2s;
  }

  & .span-mother2 span:nth-child(2) {
    transition: 0.3s;
  }

  & .span-mother2 span:nth-child(3) {
    transition: 0.4s;
  }

  & .span-mother2 span:nth-child(4) {
    transition: 0.5s;
  }

  & .span-mother2 span:nth-child(5) {
    transition: 0.6s;
  }
`;

export default function SearchResult({
  keyword,
  searchResult,
  setSearchResult,
  setSearchFinished,
}: IProps) {
  return (
    <Wrapper>
      <ResultHeader>
        <Title>{`검색 단어: ${keyword}`}</Title>
        <ClearButton
          onClick={() => {
            setSearchFinished((prev) => false);
            setSearchResult((prev) => []);
          }}
        >
          <div className="span-mother">
            <span>결</span>
            <span>과</span>
            <span>초</span>
            <span>기</span>
            <span>화</span>
          </div>
          <div className="span-mother2">
            <span>결</span>
            <span>과</span>
            <span>초</span>
            <span>기</span>
            <span>화</span>
          </div>
        </ClearButton>
      </ResultHeader>
      <Container>
        {searchResult.map((item) => (
          <Card item={item} key={item.id + ""} />
        ))}
      </Container>
    </Wrapper>
  );
}
