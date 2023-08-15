import { ToastContainer } from "react-toastify";

export default function DefaultToast() {
  return (
    <ToastContainer
      position="top-center"
      limit={1}
      autoClose={1000}
      pauseOnFocusLoss={false}
      hideProgressBar
    />
  );
}
