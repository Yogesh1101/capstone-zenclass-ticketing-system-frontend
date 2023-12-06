import React from "react";
import ReactLoading from "react-loading";

export const LoadingScreen = ({h, w, c}) => {
  return (
      <ReactLoading
        className="loading-screen"
        type={"spin"}
        color={c}
        height={h}
        width={w}
      />
  );
};
