import { RiTeamFill } from "react-icons/ri";

type propsType = {
  logoSize: string;
};

export default function JoinLogo(props: propsType) {
  return (
    <div>
      <RiTeamFill size={props.logoSize} />
    </div>
  );
}
