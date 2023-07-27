import styled from "styled-components";

import Cards from "../Components/List/Cards";
import SearchResult from "../Components/List/SearchResult";
import ToTopButton from "../Components/Global/Buttons/ToTopButton";
import { regions } from "../utils/functions";

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
        regions.map((region) => <Cards region={region} key={region} />)
      )}
      <ToTopButton onClick={() => window.scrollTo(0, 0)}></ToTopButton>
    </Wrapper>
  );
}
