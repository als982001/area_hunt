import styled from "styled-components";
import { border2px, borderRadius20px } from "../../styles/styles";
import { displayCenter } from "../../styles/displays";
import { BsMapFill } from "react-icons/bs";
import { AiFillFileImage } from "react-icons/ai";

interface IProps {
  showMap: number;
  onClick: () => void;
}

const Switch = styled.div<{ onClick?: () => void }>`
  ${borderRadius20px};
  ${border2px}
  ${displayCenter}

  width: 100px;
  height: 40px;
  cursor: pointer;
`;

const Current = styled.div<{ showMap: number }>`
  ${displayCenter}

  width: 33px;
  height: 33px;
  transform: translateX(${(props) => (props.showMap === 1 ? "-25px" : "25px")});
  transition: all 0.3s ease-in-out;
`;

export default function MapImgToggle(props: IProps) {
  return (
    <Switch onClick={props.onClick}>
      <Current showMap={props.showMap}>
        {props.showMap === 1 ? (
          <BsMapFill size="27px" />
        ) : (
          <AiFillFileImage size="27px" />
        )}
      </Current>
    </Switch>
  );
}
