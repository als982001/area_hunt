import exp from "constants";
import { css } from "styled-components";

export const fixedCenter = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
`;

export const fixedVerticalCenter = css`
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto 0;
`;

export const fixedHorizontalCenter = css`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const absoluteCenter = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
`;

export const absoluteVerticalCenter = css`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
`;

export const absoluteHorizontalCenter = css`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
