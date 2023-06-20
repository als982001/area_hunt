import styled from "styled-components";
import { useRef } from "react";

import Cards from "../Components/List/Cards";
import SearchResult from "../Components/List/SearchResult";
import { displayCenter } from "../styles/displays";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

interface IProps {
  keyword: string;
  searchResult: IArea[];
  setSearchResult: React.Dispatch<React.SetStateAction<IArea[]>>;
  searchFinished: boolean;
  setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  width: 100%;
`;

const ToTop = styled.div`
  ${displayCenter}

  width: 100%;
  margin-top: 100px;
`;

const locations = ["서울", "강원", "충청", "경상", "전라", "제주"];

export default function List({
  keyword,
  searchResult,
  setSearchResult,
  searchFinished,
  setSearchFinished,
}: IProps) {
  const btnRef = useRef(null);

  return (
    <Wrapper>
      {searchFinished ? (
        <SearchResult
          keyword={keyword}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setSearchFinished={setSearchFinished}
        />
      ) : (
        locations.map((location) => (
          <Cards location={location} key={location} />
        ))
      )}

      <ToTop ref={btnRef}>
        <BsFillArrowUpSquareFill
          onClick={() => window.scrollTo(0, 0)}
          size={"100px"}
        />
      </ToTop>
    </Wrapper>
  );
}
