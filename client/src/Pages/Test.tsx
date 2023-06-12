import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { border2px, borderRadius20px } from "../styles/styles";
import { displayCenter } from "../styles/displays";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Test() {
  return (
    <Wrapper>
      <div id="map" style={{ width: "700px", height: "500px" }}></div>
    </Wrapper>
  );
}
