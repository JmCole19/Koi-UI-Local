/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Arweave from "arweave";
import Twitter from "twitter-v2";
import { TwitterClient } from 'twitter-api-client';
import fileDownload from "js-file-download";
import { Col, Container, Row } from "react-bootstrap";
import { FaucetContainer } from "./style";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
const config = {
  consumer_key: 'EKhbBpQ4i0Fvnp7I1emd8QI7V',
  consumer_secret: 'msjd3WDiDjxR5iJU7TM32tW75f2P3fXgzHBuFJMdadnXbm8qtg',
  access_token_key: '268566493-sTwrL0d5GwqmxTjF13TIhS2QfeIsGawmB2jbkwJZ',
  access_token_secret: 'GY2tn8c4L56wpVfdkCJjkiejiy8Zt4o8SISBNtzsDNfVS'
}

function Faucet() {
  const token =
    "AAAAAAAAAAAAAAAAAAAAABZDNQEAAAAAJGt4FImlProy%2FwlT%2F1PpejL%2FcYg%3DPqn5NDHiuQwyPMr5CuO3njcUkTWuwkJ6Ol64l1njVmatGq5sXg";
    const twitterClient = new TwitterClient({
      apiKey: 'rvGVlRVVOzrVJ8Gr5HuMIIl6n',
      apiSecret: 'rvzedsxEFUwlQCjYLQRvF4ayzmGU3hwU62COUbkVoZIotQfAXV',
      accessToken: '<YOUR-TWITTER-ACCESS-TOKEN>',
      accessTokenSecret: '<YOUR-TWITTER-ACCESS-TOKEN-SECRET>',
    });
  const twitter_client = new Twitter({
    // consumer_key: "rvGVlRVVOzrVJ8Gr5HuMIIl6n",
    // consumer_secret: "rvzedsxEFUwlQCjYLQRvF4ayzmGU3hwU62COUbkVoZIotQfAXV",
    bearer_token: token,
  });
  const history = useHistory();
  console.log({ history });
  const [address, setAddress] = useState('HjgZrnSWuloWdMQXu_9ne13Vy-34VAWNtO3FAM8rch8');

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
    // const res = await axios({
    //   method: "GET",
    //   url: "https://api.twitter.com/1.1/search/tweets.json",
    //   params: {
    //     q: '"' + address + '"',
    //   },
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });

    const data = await twitterClient.tweets.search({ q: address });
    console.log({data})

    // const params = {
    //   q: address
    // }
    // twitter_client.get('search/tweets', params, async function(err, data, response) {

    //   console.log({ err, data, response });
    // })
    // const submission = {
    //   targetAddress: address,
    //   qty: 50,
    // };
    // _api(submission);
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
