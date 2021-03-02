import React from 'react'
import { Route } from 'react-router-dom';
import PageLayout from 'layouts';

const MyRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={(props) => (
      <PageLayout><Component {...props} /></PageLayout>
    )} />
  )
}

export default MyRoute;
