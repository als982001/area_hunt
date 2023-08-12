import styled from "styled-components";

import Cards from "../Components/List/Cards";
import ToTopButton from "../Components/Global/Buttons/ToTopButton";
import { IPlace } from "../utils/types";

const Wrapper = styled.div`
  width: 100%;
`;

export default function List() {
  return (
    <Wrapper>
      <div>ㅌㅋㅋㅋ</div>
      <ToTopButton onClick={() => window.scrollTo(0, 0)}></ToTopButton>
    </Wrapper>
  );
}
