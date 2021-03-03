/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Arweave from "arweave";
import fileDownload from "js-file-download";
import { Container, Modal } from "react-bootstrap";
import { FaucetContainer } from "./style";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

let address = "";
let keyAddress = "";

function Faucet() {

  const history = useHistory();
  const [showModalKey, setShowModalKey] = useState(false);
  const [myKey, setMyKey] = useState();

  const handleClose = () => setShowModalKey(false);
  
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
    let keyData = await arweave.wallets.generate();
    setMyKey(keyData)
    const data = JSON.stringify(keyData);
    fileDownload(data, "filename.json");
    // setState({activeButton: true});
    setState({ ...state, downloadButton: false });
    setState({ ...state, tweetButton: true });
    keyAddress = await arweave.wallets.jwkToAddress(keyData);
  };

  const tweetButtonHandler = async () => {
    setState({ ...state, activeButton: true });
    // const keyAddress = await arweave.wallets.jwkToAddress(key);
    const href =
      "https://twitter.com/intent/tweet?text=I%27m%20verifying%20my%20Koi%20address%20" +
      keyAddress +
      "&via=open_koi";
    const addressNew = [...state.address];
    addressNew.push(href);
    setState({ ...state, address: addressNew });
  };

  const registerClickHandler = () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    arweave.wallets.jwkToAddress(myKey).then((address) => {
      console.log(address);
      const addressNew = [...state.address];
      addressNew.pop();
      setState({ ...state, address: addressNew });
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
    //     setState({ ...state, showModal: true });
    //   })
    //   .catch((error) => {
    //     //   console.error(error)
    //   });
  };

  useEffect(() => {
    if (!myKey) {
      setShowModalKey(true)
    }
  }, [history.location.pathname])
  
  return (
    <FaucetContainer>
      <Container>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadClickHandler}
            disabled={!state.downloadButton}
          >
            DOWNLOAD ARWEAVE WALLET
          </Button>
          <Button
            onClick={tweetButtonHandler}
            variant="contained"
            disabled={!state.tweetButton}
          >
            <a
              href={state.address[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Tweet Pop-up
            </a>
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={registerClickHandler}
            disabled={!state.activeButton}
          >
            Get Koi
          </Button>
        </div>
        <div>
          <Input
            type="text"
            onChange={inputHandler}
            placeholder="input your adress"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={enterButtonHandler}
          >
            Get Koi
          </Button>
        </div>
      </Container>
      <Modal show={showModalKey} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set your key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
    </FaucetContainer>
  );
}

export default Faucet;
