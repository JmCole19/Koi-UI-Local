import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-circular-progressbar/dist/styles.css';
import 'assets/css/fontawesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import GlobalStyle from 'theme/globalStyle';
import MyRoute from 'service/MyRoute';
import Leaderboard from 'containers/Leaderboard';
import RegisterContent from 'containers/RegisterContent';
import UploadSteps from 'containers/UploadSteps';
import Checkout from 'containers/Checkout';

function App() {

  return (
    <div className="App">
      <Scrollbars autoHide style={{ flex: 1 }}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/leaderboard" />} />
            <MyRoute exact path="/leaderboard" component={Leaderboard} />
            <MyRoute exact path="/register-content" component={RegisterContent} />
            <MyRoute exact path="/check-out" component={Checkout} />
            <MyRoute path="/upload/:type" component={UploadSteps} />
          </Switch>
        </Router>
      </Scrollbars>
    </div>
  );
}

export default App;

