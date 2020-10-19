import React, { useState } from "react";
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";

// Set Up The Initial Context
export const LoadingContext = React.createContext();

const LoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);

  //

  return (
    <div>
      <Loading show={loading} color="lightseagreen" showSpinner={false} />
      <LoadingContext.Provider
        value={{
          setLoadingValue: (loading) => {
            setLoading(loading);
          },
          loading: loading
        }}
      >
        {props.children}
      </LoadingContext.Provider>
    </div>
  );
};

export default LoadingProvider;
