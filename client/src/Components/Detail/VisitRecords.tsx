import styled from "styled-components";

import VisitReview from "./VisitReview";
import RecordForm from "./RecordForm";
import useGetReviews from "../../Hooks/useGetReviews";

interface IProps {
  id: string;
}

const Wrapper = styled.div`
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

export default function VisitRecords({ id }: IProps) {
  const { userState, isLoading, reviews } = useGetReviews(id);

  return (
    <Wrapper>
      {userState.login && <RecordForm id={id} />}
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          reviews.map((review) => (
            <VisitReview key={review._id.toString()} review={review} />
          ))
        )}
      </Container>
    </Wrapper>
  );
}
