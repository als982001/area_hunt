import styled from "styled-components";
import { IReview } from "../utils/types";
import { borderRadius20px } from "../styles/styles";
import { gridCenter } from "../styles/displays";
import { fixedCenter } from "../styles/positions";

interface IProps {
  review: IReview;
}

const Container = styled.form`
  ${borderRadius20px}
  ${gridCenter}
  ${fixedCenter}

  width: 60vw;
  height: 60vh;
  padding: 20px;
  background-color: white;
  z-index: 10;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-items: center;
  box-shadow: floralwhite 0px 19px 38px, ghostwhite 0px 15px 12px;

  @media screen and (max-width: 1000px) {
    width: 70vw;
    height: 80vh;
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    padding: 10px 0;
  }
`;

export default function UpdateReviewModal({ review }: IProps) {
  return <Container></Container>;
}
