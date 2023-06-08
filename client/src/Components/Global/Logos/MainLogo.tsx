import { BsPinMapFill } from "react-icons/bs";

type propsType = {
  logoSize: string;
};

export default function MainLogo(props: propsType) {
  return (
    <div>
      <BsPinMapFill size={props.logoSize} />
    </div>
  );
}
