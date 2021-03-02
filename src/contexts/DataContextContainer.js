import React, { useState } from 'react';
import PropTypes from 'prop-types'

const DataContext = React.createContext(null);

export { DataContext };

const DataContextContainer = (props) => {

  const [authUser, setAuthUser] = useState(false);

  return(
    <DataContext.Provider
      value={{ 
        authUser, setAuthUser
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
