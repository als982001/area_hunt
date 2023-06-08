import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const idPattern = /^[0-9]{1,}$/;

    if (id === undefined) {
      navigate("/notfound");
      return;
    }

    if (idPattern.test(id) === false) {
      navigate("/notfound");
      return;
    }
  });

  return <Wrapper></Wrapper>;
}
