/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Arweave from "arweave";
import fileDownload from "js-file-download";
import { Container } from "react-bootstrap";
import // TwitterShareButton,
// TwitterTimelineEmbed,
// TwitterFollowButton,
// TwitterHashtagButton,
// TwitterMentionButton,
// TwitterTweetEmbed,
// TwitterMomentShare,
// TwitterDMButton,
// TwitterVideoEmbed,
// TwitterOnAirButton,
"react-twitter-embed";
import { FaucetContainer } from "./style";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

function Faucet() {
  const history = useHistory();
  console.log({ history });
  // const [myKey, setMyKey] = useState();
  const [address, setAddress] = useState(null);

  const onDownloadFile = async () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    let keyData = await arweave.wallets.generate();
    console.log({ keyData });
    // setMyKey(keyData);
    const data = JSON.stringify(keyData);
    fileDownload(data, "filename.json");
    // setState({activeButton: true});
    // setState({ ...state, downloadButton: false });
    // setState({ ...state, tweetButton: true });
    let addressResult = await arweave.wallets.jwkToAddress(keyData);
    console.log({ addressResult });
    setAddress(addressResult);
  };

  const tweetButtonHandler = async () => {
    // setState({ ...state, activeButton: true });
    // const keyAddress = await arweave.wallets.jwkToAddress(key);
    // const href =
    //   "https://twitter.com/intent/tweet?text=I%27m%20verifying%20my%20Koi%20address%20" +
    //   address +
    //   "&via=open_koi";
    // const addressNew = [...state.address];
    // addressNew.push(href);
    // setState({ ...state, address: addressNew });
  };

  // const registerClickHandler = () => {
  //   const arweave = Arweave.init({
  //     host: "arweave.net",
  //     port: 443,
  //     protocol: "https",
  //   });
  //   arweave.wallets.jwkToAddress(myKey).then((address) => {
  //     console.log(address);
  //     // const addressNew = [...state.address];
  //     // addressNew.pop();
  //     // setState({ ...state, address: addressNew });
  //     const submission = {
  //       targetAddress: address,
  //       qty: 50,
  //     };
  //     _api(submission);
  //   });
  // };

  const enterButtonHandler = () => {
    const submission = {
      targetAddress: address,
      qty: 50,
    };
    _api(submission);
  };
  const _api = () => {
    // const url = process.env.REACT_APP_API_URL;
    // axios
    //   .post(url, submission)
    //   .then((res) => {
    //     console.log(`statusCode: ${res.statusCode}`);
    //     console.log(res);
    //     setState({ ...state, showModal: true });
    //   })
    //   .catch((error) => {
    //     //   console.error(error)
    //   });
  };
  console.log({ address });
  return (
    <FaucetContainer>
      <Container>
        <div className="section-get-koi">
          <h2>Set your key</h2>
          <p>If you have a wallet address</p>
          <Input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="input your adress"
          />
          <p>or don't have a wallet? Please download your key file.</p>
          <Button
            variant="contained"
            color="primary"
            onClick={onDownloadFile}
            disabled={false}
          >
            DOWNLOAD ARWEAVE WALLET
          </Button>
        </div>
        <div className="section-set-key">
          <h2>Your Key: {address}</h2>
          <Button
            onClick={tweetButtonHandler}
            variant="contained"
            disabled={!address}
          >
            <a
              href={
                address
                  ? `https://twitter.com/intent/tweet?text=I%27m%20verifying%20my%20Koi%20address%20${address}&via=open_koi`
                  : "#/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Tweet Pop-up
            </a>
          </Button>
          {/* <TwitterShareButton
            url={null}
            options={{ text: `I am verifying my KOI address ${address}`, via: "open_koi" }}
          /> */}
          {/* <Button
            color="primary"
            variant="contained"
            onClick={registerClickHandler}
            disabled={false}
          >
            Get Koi
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={enterButtonHandler}
          >
            Get Koi
          </Button>
        </div>
      </Container>
    </FaucetContainer>
  );
}

export default Faucet;
