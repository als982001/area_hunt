import styled from "styled-components";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { IAccount } from "../../utils/types";
import useMyReviews from "../../Hooks/useMyReviews";
import { useEffect } from "react";
import MyReview from "./MyReview";

interface IProps {
  userInfo: IAccount;
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  height: auto;
  margin-top: 100px;

  @media screen and (max-width: 1000px) {
    padding: 0 100px;
  }

  @media screen and (max-width: 450px) {
    padding: 0 10px;
  }
`;

const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0;
`;

const ShowBtn = styled(BiArrowFromTop)`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const HideBtn = styled(BiArrowToTop)`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function MyReviews({ userInfo }: IProps) {
  const { showAll, setShowAll, isLoading, data, getSliceIdx } = useMyReviews();

  return (
    <Wrapper>
      <Header>
        <Title>내 리뷰들</Title>
        {showAll ? (
          <HideBtn onClick={() => setShowAll(false)} />
        ) : (
          <ShowBtn onClick={() => setShowAll(true)} />
        )}
      </Header>
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data
            ?.slice(0, getSliceIdx())
            .map((review) => (
              <MyReview key={review._id.toString()} review={review} />
            ))
        )}
      </Container>
    </Wrapper>
  );
}
