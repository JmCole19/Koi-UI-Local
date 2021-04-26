import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { getKoi } from "service/KOI";
import { convertArBalance } from "service/utils";
import { useLocalStorage } from "hooks"

const DataContext = React.createContext(null);

export { DataContext };

function DataContextContainer(props){
  const [addressEth, setAddressEth] = useLocalStorage('koi-addressEth', null);
  const [openSeas, setOpenSeas] = useState([]);
  const [addressAr, setAddressAr] = useLocalStorage('koi-addressAr', null);
  const [keyAr, setKeyAr] = useLocalStorage('koi-keyAr', null);
  const [balanceKoi, setBalanceKoi] = useLocalStorage('koi-balanceKoi', null);
  const [balanceAr, setBalanceAr] = useLocalStorage('koi-balanceAr', null);
  // const [contents, setContents] = useState([]);

  const getKoiBalance = async () => {
    if(keyAr) {
      let balance = await getKoi(keyAr)
      setBalanceKoi(Number(balance.koiBalance))
      setBalanceAr(convertArBalance(balance.arBalance))
    }else{
      console.log("test key", keyAr)
      console.log('ther is no key file')
    }
  }

  // useEffect( () => {
  //   if(keyAr) {
  //     // get KOI automatically
  //     getKoiBalance()
  //   }
  // }, [keyAr])
  // useEffect( () => {
  //   console.log("test111")
  //   let saveData = localStorage.getItem('info')
  //   let str_expired = localStorage.getItem('expired')
  //   if(saveData && str_expired) {
  //     let expired = Number(str_expired)
  //     let cur = new Date()
  //     if( cur.getTime() - expired > 0) {
  //       // remove storage
  //       localStorage.removeItem('expired')
  //       localStorage.removeItem('info')
  //     }else{
  //       let information = JSON.parse(saveData)
  //       // console.log("here : load data ********* ")
  //       // console.log(information)
  //       if(information['addressEth']) setAddressEth(information['addressEth']) 
  //       if(information['addressAr']) setAddressAr(information['addressAr']) 
  //       if(information['keyAr']) setKeyAr(information['keyAr']) 
  //       if(information.hasOwnProperty('balanceKoi')) setBalanceKoi(information['balanceKoi']) 
  //       if(information.hasOwnProperty('balanceAr')) setBalanceAr(information['balanceAr']) 
  //     }
  //   }

  // }, [])
  
  useInterval( () => getKoiBalance(), 120000);

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
        // contents,
        // setContents,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // remember the latet callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback]);

  // set up the interval.
  useEffect(() => {
    let id = setInterval( () => {
      savedCallback.current()
    }, [delay])
    return () => clearInterval(id)
  }, [delay]);
}
DataContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContextContainer;
