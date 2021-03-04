/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Arweave from "arweave";
import fileDownload from "js-file-download";
import { Col, Container, Row } from "react-bootstrap";
import { FaucetContainer } from "./style";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

function Faucet() {
  const history = useHistory();
  console.log({ history });
  const [address, setAddress] = useState(null);

  const onDownloadFile = async () => {
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    let keyData = await arweave.wallets.generate();
    console.log({ keyData });
    const data = JSON.stringify(keyData);
    fileDownload(data, "filename.json");
    let addressResult = await arweave.wallets.jwkToAddress(keyData);
    console.log({ addressResult });
    setAddress(addressResult);
  };

  const tweetButtonHandler = async () => {
    console.log("set your key first");
  };

  const enterButtonHandler = async () => {
    
  };
  
  return (
    <FaucetContainer>
      <Container>
        <div className="section section-set-key">
          <h2>Set your key</h2>
          <Row className="set-key-wrapper">
            <Col>
              <div className="set-koi-left set-koi-card">
                <p>If you have a wallet address</p>
                <Input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="input your adress"
                />
                <p>OR</p>
                <Button>Upload your file</Button>
              </div>
            </Col>
            <Col>
              <div className="set-koi-right set-koi-card">
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
            </Col>
          </Row>
        </div>
        <div className="section section-get-koi">
          <h2>Your Key: {address}</h2>
          <Button
            onClick={tweetButtonHandler}
            className='btn-blueDark'
            disabled={!address}
          >
            <a
              href={`https://twitter.com/intent/tweet?text=I%27m%20verifying%20my%20Koi%20address%20${address}&via=open_koi`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Tweet Pop-up
            </a>
          </Button>
          <Button
            className='btn-blueDark'
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
