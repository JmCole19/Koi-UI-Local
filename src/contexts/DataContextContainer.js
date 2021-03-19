import React, { useState } from "react";
import PropTypes from "prop-types";

const DataContext = React.createContext(null);

export { DataContext };

const DataContextContainer = (props) => {
  const [authUser, setAuthUser] = useState(false);
  const [addressEth, setAddressEth] = useState(null);
  const [openSeas, setOpenSeas] = useState([]);
  const [addressArweave, setAddressArweave] = useState(null);
  const [keyAr, setKeyAr] = useState(null);
  const [balanceKoi, setBalanceKoi] = useState(null);
  const [balanceAr, setBalanceAr] = useState(null);
  const [contents, setContents] = useState([]);

  return (
    <DataContext.Provider
      value={{
        authUser,
        setAuthUser,
        addressEth,
        setAddressEth,
        openSeas,
        setOpenSeas,
        addressArweave,
        setAddressArweave,
        keyAr,
        setKeyAr,
        balanceKoi,
        setBalanceKoi,
        balanceAr,
        setBalanceAr,
        contents,
        setContents,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

DataContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContextContainer;
