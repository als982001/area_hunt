import { css } from "styled-components";

export const borderRadius20px = css`
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const border2px = css`
  border: 2px solid black;
`;

export const border1px = css`
  border: 1px solid black;
`;

export const centerImage = css<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

export const AuthForm = css`
  background-color: #fff;
  display: block;
  padding: 15px;
  width: 500px;
  border-radius: 30px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  margin-top: 100px;
`;

export const AuthInputStyle = css`
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  background-color: #fff;
  padding: 15px;
  padding-right: 45px;
  font-size: 15px;
  line-height: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;
