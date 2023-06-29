import styled from "styled-components";

interface IProps {
  children: string;
}

const Button = styled.button`
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
`;

export default function AuthButton(props: IProps) {
  return <Button>{props.children}</Button>;
}
