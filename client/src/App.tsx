import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { handleAuth, handleLogin, handleLogout } from "./Redux/Actions";
import { handleLoginCheck } from "./utils/MemberFunctions";

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
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<IItem[]>([]);
  const [searchFinished, setSearchFinished] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSetKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((prev) => event.target.value);
  };

  const handleSetSearchResult = async (result: IItem[]) => {
    setSearchResult((prev) => [...result]);
  };

  const authHandler = async () => {
    try {
      const result = await handleLoginCheck();

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
      <Header
        keyword={keyword}
        handleSetKeyword={handleSetKeyword}
        handleSetSearchResult={handleSetSearchResult}
        setSearchFinished={setSearchFinished}
      />
      <Container>
        <Routes>
          <Route path="/regist" element={<Regist />} />
          <Route
            path="/list"
            element={
              <List
                keyword={keyword}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                searchFinished={searchFinished}
                setSearchFinished={setSearchFinished}
              />
            }
          />
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
