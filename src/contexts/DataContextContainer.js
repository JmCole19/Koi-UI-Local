import React, { useState } from 'react';
import PropTypes from 'prop-types'

const DataContext = React.createContext(null);

export { DataContext };

const DataContextContainer = (props) => {

  const [authUser, setAuthUser] = useState(false); 
  const [address, setAddress] = useState(null); 

  return(
    <DataContext.Provider
      value={{ 
        authUser, setAuthUser,
        address, setAddress
      }}
    >
      { props.children }
    </DataContext.Provider>
  )
}

DataContextContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


export default DataContextContainer;
