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
import axios from "axios";
import Test from "./Pages/Test";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
`;

const Container = styled.main`
  width: 100%;
  height: auto;
`;

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Routes>
          <Route path="/regist" element={<Regist />} />
          <Route path="/list" element={<List />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/test" element={<Test />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}

export default App;
