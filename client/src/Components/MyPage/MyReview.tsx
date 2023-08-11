import styled from "styled-components";
import { IReview } from "../../utils/types";
import { border2px, borderRadius20px } from "../../styles/styles";
import { useNavigate } from "react-router-dom";

interface IProps {
  review: IReview;
}

const Container = styled.section`
  ${border2px}
  ${borderRadius20px}
  width: 100%;
  height: 100px;
  margin: 10px 0;
  padding: 0 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100px;
`;

const Content = styled.h4`
  width: 100%;
  padding: 0 50px;
  font-size: 17px;
  font-weight: 400;
`;

const Date = styled.h5`
  width: 100px;
  text-align: center;
  font-weight: 400;
`;

export default function MyReview({ review }: IProps) {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/${review.placeId}`);
      }}
    >
      <Image src={review.imageUrl} alt="리뷰이미지" />
      <Content>{review.content}</Content>
      <Date>{review.date}</Date>
    </Container>
  );
}
