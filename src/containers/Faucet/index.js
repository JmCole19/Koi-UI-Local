import React, { useState } from "react";
import Arweave from "arweave";
import fileDownload from "js-file-download";
import { Container } from "react-bootstrap";
import { FaucetContainer } from "./style";
import CardOne from "./CardOne/CardOne";
import CardTwo from "./CardTwo/CardTwo";

let key = {};
let address = "";
let keyAddress = "";

function Faucet() {
  const [state, setState] = useState({
    activeButton: false,
    downloadButton: true,
    tweetButton: false,
    address: [],
    showModal: false,
  });

  const downloadClickHandler = async () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    key = await arweave.wallets.generate();
    const data = JSON.stringify(key);
    fileDownload(data, "filename.json");
    // setState({activeButton: true});
    setState({ downloadButton: false });
    setState({ tweetButton: true });
    keyAddress = await arweave.wallets.jwkToAddress(key);
  };

  const tweetButtonHandler = async () => {
    setState({ activeButton: true });
    // const keyAddress = await arweave.wallets.jwkToAddress(key);
    const href =
      "https://twitter.com/intent/tweet?text=I%27m%20verifying%20my%20Koi%20address%20" +
      keyAddress +
      "&via=open_koi";
    const addressNew = [...state.address];
    addressNew.push(href);
    setState({ address: addressNew });
  };

  const registerClickHandler = () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    arweave.wallets.jwkToAddress(key).then((address) => {
      console.log(address);
      const addressNew = [...state.address];
      addressNew.pop();
      setState({ address: addressNew });
      const submission = {
        targetAddress: address,
        qty: 50,
      };
      _api(submission);
    });
  };

  const inputHandler = async (event) => {
    address = event.target.value;
  };

  const enterButtonHandler = () => {
    const submission = {
      targetAddress: address,
      qty: 50,
    };
    _api(submission);
  };
  const _api = (submission) => {
    // const url = process.env.REACT_APP_API_URL;
    // axios
    //   .post(url, submission)
    //   .then((res) => {
    //     console.log(`statusCode: ${res.statusCode}`);
    //     console.log(res);
    //     setState({ showModal: true });
    //   })
    //   .catch((error) => {
    //     //   console.error(error)
    //   });
  };
  return (
    <FaucetContainer>
      <Container>
        <CardOne
          clickedDownLoad={downloadClickHandler}
          clickRegister={registerClickHandler}
          disable={state.activeButton}
          disabled={state.downloadButton}
          disableTweet={state.tweetButton}
          tweetButton={tweetButtonHandler}
          address={state.address[0]}
        />
        <CardTwo change={inputHandler} clickedEnter={enterButtonHandler} />
      </Container>
    </FaucetContainer>
  );
}

export default Faucet;
