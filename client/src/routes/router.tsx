import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../Pages/NotFound";
import Main from "../Pages/Main";
import Regist from "../Pages/Regist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Main /> },
      { index: true, path: "/regist", element: <Regist /> },
    ],
  },
]);
