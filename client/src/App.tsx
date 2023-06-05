import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Detail from "./Pages/Detail";
import Regist from "./Pages/Regist";
import List from "./Pages/List";
import MyPage from "./Pages/MyPage";
import Login from "./Pages/Login";
import Join from "./Pages/Join";
import Header from "./Components/Global/Header/Header";
import NotFound from "./Pages/NotFound";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
`;

const Container = styled.main``;

function App() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Routes>
          <Route path="/detail" element={<Detail />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}

export default App;
