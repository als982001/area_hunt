import { BsPinMapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

type propsType = {
  logoSize: string;
};

const Container = styled.div`
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export default function MainLogo(props: propsType) {
  return (
    <Container>
      <Link to="/list">
        <BsPinMapFill size={props.logoSize} />
      </Link>
    </Container>
  );
}
