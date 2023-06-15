import { PuffLoader } from "react-spinners";

interface ISpinner {
  marginTop?: string;
}

export default function Spinner({ marginTop }: ISpinner) {
  return (
    <div
      style={{
        marginTop: marginTop || "0px",
        height: "100px",
        width: "100px",
      }}
    >
      <PuffLoader size={100} color="black" />
    </div>
  );
}
