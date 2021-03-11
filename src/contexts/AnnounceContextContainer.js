import React, { useState } from "react";
import PropTypes from "prop-types";

const AnnounceContext = React.createContext(null);

export { AnnounceContext };

const AnnounceContextContainer = (props) => {
  const [message, setMessage] = useState("");

  return (
    <AnnounceContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {props.children}
    </AnnounceContext.Provider>
  );
};

AnnounceContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnnounceContextContainer;
