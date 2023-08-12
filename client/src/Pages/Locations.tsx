import styled from "styled-components";
import Cards from "../Components/List/Cards";
import ToTopButton from "../Components/Global/Buttons/ToTopButton";

const Wrapper = styled.div`
  width: 100%;
`;

export default function Locations() {
  const locations = [
    "서울",
    "강원",
    "충청",
    "경상",
    "전라",
    "제주",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
  ];

  return (
    <Wrapper>
      {locations.map((location) => (
        <Cards location={location} key={location} />
      ))}
      <ToTopButton onClick={() => window.scrollTo(0, 0)}></ToTopButton>
    </Wrapper>
  );
}
