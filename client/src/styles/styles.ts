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

export const BlueButton = css`
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgb(0, 17, 255) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }
`;
