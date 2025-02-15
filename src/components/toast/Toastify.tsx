import { Slide, ToastContainer } from "react-toastify";

import type { ToastContainerProps } from "react-toastify";

/**
 * Toastify 提示组件
 * @returns {React.FunctionComponent}
 */
const Toastify = (props: ToastContainerProps) => {
  return (
    <>
      <style>--toastify-toast-padding: 0</style>
      <ToastContainer
        position="bottom-left"
        autoClose={30000}
        hideProgressBar
        transition={Slide}
        {...props}
      />
    </>
  );
};

export default Toastify;

export const CustomToast = () => {
  return <div>1</div>;
};
