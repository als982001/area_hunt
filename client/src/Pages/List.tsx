import styled from "styled-components";

import Cards from "../Components/List/Cards";
import SearchResult from "../Components/List/SearchResult";
import ToTopButton from "../Components/Global/Buttons/ToTopButton";

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

const locations = ["서울", "강원", "충청", "경상", "전라", "제주"];

export default function List({
  keyword,
  searchResult,
  setSearchResult,
  searchFinished,
  setSearchFinished,
}: IProps) {
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
      <ToTopButton onClick={() => window.scrollTo(0, 0)}></ToTopButton>
    </Wrapper>
  );
}
