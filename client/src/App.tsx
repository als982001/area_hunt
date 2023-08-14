import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Components/Global/Header/Header";
import Main from "./Pages/Main";
import Detail from "./Pages/Detail";
import Regist from "./Pages/Regist";
import List from "./Pages/List";
import MyPage from "./Pages/MyPage";
import Login from "./Pages/Login";
import Join from "./Pages/Join";
import NotFound from "./Pages/NotFound";

import { handleAuth, handleLogout } from "./Redux/Actions";
import { loginCheck } from "./utils/memberFunctions";
import { IPlace } from "./utils/types";
import Locations from "./Pages/Locations";
import Search from "./Pages/Search";

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
  const dispatch = useDispatch();

  const authHandler = async () => {
    try {
      const result = await loginCheck();

      dispatch(handleAuth(result));
    } catch (err) {
      dispatch(handleLogout());
    }
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/list" element={<List />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
    </Wrapper>
  );
}

export default App;
