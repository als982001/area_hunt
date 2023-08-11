import styled from "styled-components";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import useMyPlaces from "../../Hooks/useMyPlaces";
import { IAccount } from "../../utils/types";
import Card from "../List/Card";

interface IProps {
  userInfo: IAccount;
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  height: auto;
  margin-top: 100px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 50px;
`;

export default function MyPlaces({ userInfo }: IProps) {
  const { showAll, setShowAll, isLoading, data, getSliceIdx } =
    useMyPlaces(userInfo);

  return (
    <Wrapper>
      <Header>
        <Title>내가 등록한 장소들</Title>
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
            .map((place) => (
              <Card key={place._id.toString()} item={place} mypage={true} />
            ))
        )}
      </Container>
    </Wrapper>
  );
}
