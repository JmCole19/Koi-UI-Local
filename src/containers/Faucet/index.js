/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Arweave from "arweave";
import fileDownload from "js-file-download";
import { Carousel, Container } from "react-bootstrap";
import { FaucetContainer } from "./style";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

function Faucet() {
  const history = useHistory();
  console.log({ history });
  const [address, setAddress] = useState(null);
  const [step, setStep] = useState(0);
  // const [hasAddress, setHasAddress] = useState(false);

  const onSkipGetWallet = () => {
    setStep(1);
  };

  const onClickSubmitAddress = () => {
    setStep(2);
  };

  const onClickGetWallet = async () => {
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
    setStep(2);
  };

  const onClickTweet = async () => {
    const text = encodeURI("I'm verifying my Arweave address ");
    window.open(
      `https://twitter.com/intent/tweet?text=${text}${address}`,
      "twitpostpopup",
      `left=${window.screenX + 100}, top=${
        window.screenY + 100
      }, width=500, height=448, toolbar=no`
    );
    setStep(3);
  };

  const onClickGetKoi = async () => {
    console.log("This checkes if it is posted in twitter correctly");
    setStep(4);
  };

  const onClickUpload = () => {
    history.push("/register-content");
  };

  return (
    <FaucetContainer>
      <Container>
        <h1 className="f-32 text-blue">Want to earn attention rewards?</h1>
        <h6 className="text-blue">
          Get free KOI here so you can upload to the network. Just follow the
          steps below.
        </h6>
        <Carousel
          className="faucet-cards-wrapper"
          pause="hover"
          nextIcon={null}
          prevIcon={null}
          indicators={null}
          activeIndex={step}
        >
          <Carousel.Item>
            <div className="faucet-step-card">
              <h1 className="f-32 text-blue">1</h1>
              <div className="step-content">
                <h6 className="step-title text-blue">Get an Arweave wallet.</h6>
                <h6 className="text-blue">
                  Already have an Arweave wallet?{" "}
                  <b onClick={onSkipGetWallet}>Skip ahead</b>.
                </h6>
                <Button
                  className="btn-step-card mt-auto mx-auto"
                  onClick={onClickGetWallet}
                >
                  Get a Wallet
                </Button>
                <p className="text-blue">
                  This button downloads a .JSON wallet file. You don’t need to
                  do anything with it yet.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="faucet-step-card">
              <h1 className="f-32 text-blue">1</h1>
              <div className="step-content">
                <h6 className="step-title text-blue">Connect a wallet</h6>
                <h6 className="text-blue">
                  Paste your Arweave wallet address here.
                </h6>
                <div className="submit-wrapper">
                  <Input onChange={(e) => setAddress(e.target.value)} />
                  <Button
                    className="btn-step-card mt-auto mx-auto"
                    onClick={onClickSubmitAddress}
                  >
                    Submit Address
                  </Button>
                </div>
                <p className="text-blue">
                  Head back to uploading your content and start earning.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="faucet-step-card">
              <h1 className="f-32 text-blue">2</h1>
              <div className="step-content">
                <h6 className="step-title text-blue">Verify with a Tweet.</h6>
                <h6 className="text-blue">
                  We need to make sure you’re a real person and not a bot.
                  Posting on Twitter with an active account is the easiest way
                  to do that.
                </h6>
                <Button
                  className="btn-step-card mt-auto mx-auto"
                  onClick={onClickTweet}
                  disabled={!address}
                >
                  Tweet to Verify
                </Button>
                <p className="text-blue">
                  We will generate the tweet for you. All you need to do is log
                  in and click “Tweet.”
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="faucet-step-card">
              <h1 className="f-32 text-blue">3</h1>
              <div className="step-content">
                <h6 className="step-title text-blue">Get KOI</h6>
                <h6 className="text-blue">
                  After you’ve tweeted, click here to claim your free KOI!
                </h6>
                <Button
                  className="btn-step-card mt-auto mx-auto"
                  onClick={onClickGetKoi}
                >
                  Get KOI
                </Button>
                <p className="text-blue">
                  We will generate the tweet for you. All you need to do is log
                  in and click “Tweet.”
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="faucet-step-card">
              <h1 className="f-32 text-blue">4</h1>
              <div className="step-content">
                <h6 className="step-title text-blue">
                  You just earned 5 KOI!{" "}
                </h6>
                <h6 className="text-blue">
                  In 3 minutes, you’ll be able to upload content, earn rewards,
                  and much more.
                </h6>
                <Button
                  className="btn-step-card mt-auto mx-auto"
                  onClick={onClickUpload}
                >
                  Upload Content
                </Button>
                <p className="text-blue">
                  Head back to uploading your content and start earning.
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
        {/* <div className="section section-set-key">
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
            className="btn-blueDark"
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
          <Button className="btn-blueDark" onClick={enterButtonHandler}>
            Get Koi
          </Button>
        </div> */}
      </Container>
    </FaucetContainer>
  );
}

export default Faucet;
