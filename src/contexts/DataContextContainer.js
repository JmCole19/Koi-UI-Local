import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DataContext = React.createContext(null);

export { DataContext };

const DataContextContainer = (props) => {
  const [addressEth, setAddressEth] = useState(null);
  const [openSeas, setOpenSeas] = useState([]);
  const [addressAr, setAddressAr] = useState(null);
  const [keyAr, setKeyAr] = useState(null);
  const [balanceKoi, setBalanceKoi] = useState(null);
  const [balanceAr, setBalanceAr] = useState(null);
  const [contents, setContents] = useState([]);

  useEffect( () => {
    let saveData = localStorage.getItem('info')
    if(saveData) {
      let information = JSON.parse(saveData)
    }

  }, [addressEth, keyAr, openSeas, addressAr, keyAr, balanceKoi, balanceAr])

  useEffect( () => {
    let saveData = localStorage.getItem('info')
    if(saveData) {
      let information = JSON.parse(saveData)
      if(information) {

      }
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        addressEth,
        setAddressEth,
        addressAr,
        setAddressAr,
        openSeas,
        setOpenSeas,
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
