import styled from "styled-components";
import { border2px, borderRadius20px } from "../../../styles/styles";
import { displayCenter } from "../../../styles/displays";

interface IProps {
  on: boolean;
}

const Switch = styled.div`
  ${borderRadius20px};
  ${border2px}
  ${displayCenter}

  width: 100px;
  height: 40px;
  cursor: pointer;
`;

const Current = styled.div<{ on: boolean }>`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  transform: translateX(${(props) => (props.on ? "-28px" : "28px")});
  transition: all 0.3s ease-in-out;
`;

export default function ToggleSwitch(props: IProps) {
  return (
    <Switch>
      <Current on={props.on} />
    </Switch>
  );
}
