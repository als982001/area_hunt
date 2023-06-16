import styled from "styled-components";
import Card from "../Components/List/Card";
import { displayCenter } from "../styles/displays";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllItems, getSomeItems } from "../utils/itemFunctions";
import Spinner from "../Components/Global/Spinner";
import Cards from "../Components/List/Cards";
import SearchResult from "../Components/List/SearchResult";

interface ISearch {
  keyword: string;
  searchResult: IItem[];
  setSearchResult: React.Dispatch<React.SetStateAction<IItem[]>>;
  searchFinished: boolean;
  setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  width: 100%;
`;

const Loader = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  justify-content: center;
`;

const Cardss = styled.div`
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

const locations = ["서울", "강원", "충청", "경상", "전라", "제주"];

export default function List({
  keyword,
  searchResult,
  setSearchResult,
  searchFinished,
  setSearchFinished,
}: ISearch) {
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
