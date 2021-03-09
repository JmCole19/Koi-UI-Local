import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import "react-circular-progressbar/dist/styles.css";
import "assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import GlobalStyle from "theme/globalStyle";
import MyRoute from "service/MyRoute";
import Leaderboard from "containers/Leaderboard";
import RegisterContent from "containers/RegisterContent";
import UploadArweave from "containers/UploadArweave";
import Checkout from "containers/Checkout";
import Faucet from "containers/Faucet";
import UploadOpenSea from "containers/UploadOpenSea";
import ContentDetail from "containers/ContentDetail";
import UploadEthereum from "containers/UploadEthereum";
import DataContextContainer from "contexts/DataContextContainer";

function App() {
  return (
    <div className="App">
      <Scrollbars autoHide style={{ flex: 1 }}>
        <GlobalStyle />
        <Router>
          <Switch>
            <DataContextContainer>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/contents" />}
              />
              <MyRoute exact path="/contents" component={Leaderboard} />
              <MyRoute path="/content-detail/:id" component={ContentDetail} />
              <MyRoute
                exact
                path="/register-content"
                component={RegisterContent}
              />
              <MyRoute exact path="/opensea" component={UploadOpenSea} />
              <MyRoute exact path="/check-out" component={Checkout} />
              <MyRoute
                exact
                path="/upload/ethereum"
                component={UploadEthereum}
              />
              <MyRoute exact path="/upload/arweave" component={UploadArweave} />
              <MyRoute path="/faucet" component={Faucet} />
            </DataContextContainer>
          </Switch>
        </Router>
      </Scrollbars>
    </div>
  );
}

export default App;
