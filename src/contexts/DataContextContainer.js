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
    let saveData = {}
    if(addressEth) saveData.addressEth = addressEth
    if(addressAr) saveData.addressAr = addressAr
    if(keyAr) saveData.keyAr = keyAr
    if(balanceKoi !== null ) saveData.balanceKoi = balanceKoi
    if(balanceAr !== null ) saveData.balanceAr = balanceAr
    if(saveData && Object.keys(saveData).length !== 0){
      // console.log("here : save data ********* ")
      // console.log(saveData)
      let d = new Date()
      let expired = d.getTime() + 60 * 1000 * 5 // 5 minute
      localStorage.setItem('info', JSON.stringify(saveData))
      localStorage.setItem('expired', expired.toString())
    }
  }, [addressEth, addressAr, keyAr, openSeas, balanceKoi, balanceAr])

  useEffect( () => {
    let saveData = localStorage.getItem('info')
    let str_expired = localStorage.getItem('expired')
    if(saveData && str_expired) {
      let expired = Number(str_expired)
      let cur = new Date()
      if( cur.getTime() - expired > 0) {
        // remove storage
        localStorage.removeItem('expired')
        localStorage.removeItem('info')
      }else{
        let information = JSON.parse(saveData)
        // console.log("here : load data ********* ")
        // console.log(information)
        if(information['addressEth']) setAddressEth(information['addressEth']) 
        if(information['addressAr']) setAddressAr(information['addressAr']) 
        if(information['keyAr']) setKeyAr(information['keyAr']) 
        if(information.hasOwnProperty('balanceKoi')) setBalanceKoi(information['balanceKoi']) 
        if(information.hasOwnProperty('balanceAr')) setBalanceAr(information['balanceAr']) 
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
