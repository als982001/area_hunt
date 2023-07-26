import styled from "styled-components";

import VisitRecord from "./VisitRecord";
import RecordForm from "./RecordForm";
import useGetReviews from "../../Hooks/useGetReviews";

interface IProps {
  id: string | number;
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
  const { userState, isLoading, records } = useGetReviews(id);

  return (
    <Wrapper>
      {userState.login && <RecordForm id={id} />}
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          records.map((record) => (
            <VisitRecord key={record.id + ""} record={record} />
          ))
        )}
      </Container>
    </Wrapper>
  );
}
