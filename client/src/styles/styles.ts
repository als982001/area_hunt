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
