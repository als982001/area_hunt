import { BiLogIn } from "react-icons/bi";

type propsType = {
  logoSize: string;
};

export default function MainLogo(props: propsType) {
  return (
    <div>
      <BiLogIn size={props.logoSize} />
    </div>
  );
}
