import styled from "styled-components";

interface IProps {
  children: any;
  width?: string;
  height?: string;
  fontSize?: string;
  content?: string;
  onClick?: () => void;
}

export default function TestButton(props: any) {
  console.log(props);

  console.log(typeof props.children);

  return <div>{props.children}</div>;
}
