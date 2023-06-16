import styled from "styled-components";
import Card from "./Card";

interface IResult {
  keyword: string;
  searchResult: IItem[];
  setSearchResult: React.Dispatch<React.SetStateAction<IItem[]>>;
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

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }

  justify-items: center;
  row-gap: 100px;
`;

const ClearButton = styled.button`
  width: 100px;
  height: 60px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: #c4b0ff;
  color: #11009e;
  font-size: 15px;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function SearchResult({
  keyword,
  searchResult,
  setSearchResult,
  setSearchFinished,
}: IResult) {
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
          결과 초기화
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
