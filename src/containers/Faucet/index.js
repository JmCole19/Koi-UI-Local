/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import Arweave from "arweave";
import queryString from "query-string";
import customAxios from "service/customAxios";
import fileDownload from "js-file-download";
import { Carousel, Container, Toast } from "react-bootstrap";
import { FaucetContainer } from "./style";
import { Button, Input, Spin, Upload } from "antd";
import { useHistory } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { show_notification } from "service/utils";
const { Dragger } = Upload;

const arweave = Arweave.init();

function Faucet() {
  const history = useHistory();
  const [address, setAddress] = useState(null);
  const [koiBalance, setKoiBalance] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [twMessage, setTwMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const { step } = queryString.parse(history.location.search);
  const queryAddress = queryString.parse(history.location.search).address || "";
  const [curStep, setCurStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    addressArweave,
    setAddressArweave,
    keyAr,
    setKeyAr
  } = useContext(DataContext);
  const [detectorAr, setDetectorAr] = useState(false);
  
  const onSkipGetWallet = () => {
    setCurStep(1);
    history.push(`/faucet?step=1`);
  };

  const onClickSubmitAddress = () => {
    setCurStep(2);
    setAddressArweave(address);
    history.push(`/faucet?step=1&address=${address}`);
  };

  const onClickGetWallet = async () => {
    if(addressArweave) {
      show_notification('You already have an Araweave address')
      setTimeout( () => {
        setCurStep(2);
        if(keyAr)
          history.push(`/faucet?step=2&address=${addressArweave}`);
        else
          history.push(`/faucet?step=1&address=${addressArweave}`);
      })
    }else if( !detectorAr ){
      setDetectorAr(true)
    }else{
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });
      let keyData = await arweave.wallets.generate();
      const data = JSON.stringify(keyData);
      fileDownload(data, "arweaveWallet.json");
      let addressResult = await arweave.wallets.jwkToAddress(keyData);
      setAddress(addressResult);
      setAddressArweave(addressResult);
      setKeyAr(keyData)
      setCurStep(2);
      history.push(`/faucet?step=2&address=${addressResult}`);
    }
  };

  const onClickTweet = async () => {
    const text = encodeURI("I just joined the @open_koi #web3 economy. #PayAttention with us, the future is now. ");
    window.open(
      `https://twitter.com/intent/tweet?text=${text}${address}`,
      "twitpostpopup",
      `left=${window.screenX + 100}, top=${
        window.screenY + 100
      }, width=500, height=448, toolbar=no`
    );
    setCurStep(3);
    history.push(`/faucet?step=3&address=${address}`);
  };

  const getKoi = async () => {
    setLoading(true)
    let {
      ok,
      data: { data },
    } = await customAxios.post(`/getKoi`, {
      address: address,
    });
    if (ok) {
      setLoading(false)
      setKoiBalance(data.koiBalance);
      setCurStep(4);
      history.push(`/faucet?step=4&address=${address}`);
    } else {
      setLoading(false)
      console.log("get koi error");
    }
  }

  const onClickGetKoi = async () => {
    console.log("here");
    if (address) {
      setLoading(true)
      let { ok, data: {data} } = await customAxios.post(`/searchTweet`, {
        address: address,
      });
      if (ok) {
        show_notification(data.message)
        setTwMessage(data.message)
        console.log(data.posted)
        console.log(data.duplicate)
        console.log(data.freeKoi)
        await getKoi()
      } else {
        setLoading(false)
        setErrMessage("Not posted on twitter!");
        setShowToast(true);
      }
    } else {
      setLoading(false)
      setErrMessage("You don't have an address yet!");
      setShowToast(true);
    }
  };
  
  const onClickUpload = () => {
    history.replace("/contents");
  };

  const onClickBackTo = (step) => {
    setCurStep(step);
    if (step < 2) {
      history.push(`/faucet?step=${step}`);
    } else {
      history.push(`/faucet?step=${step}&address=${address}`);
    }
  };

  const beforeJsonUpload = (file) => {
    // console.log('file type : ', file)
    const isJson = file.type === "application/json";
    if (!isJson) {
      show_notification("You can only upload JPG/PNG file!");
    }
    const isLt1M = file.size / 1024 < 512;
    if (!isLt1M) {
      show_notification("JSON must smaller than 512KB!");
    }
    if (isJson && isLt1M) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        var arJson = JSON.parse(e.target.result);
        const arweave = Arweave.init();
        let addressResult = await getArWalletAddressFromJson(arweave, arJson);
        try {
          let res = await exportNFT(
            arweave,
            addressResult,
            activeContent,
            "",
            imageBlob,
            arJson
          );
          if (res) {
            show_notification(
              "Your transaction id is " + res + ". Upload successfully",
              "NFT uploading",
              "success"
            );
            setTimeout(() => {
              history.push("/contents");
            }, 3000);
          } else {
            show_notification("Something error", "NFT uploading");
          }
        } catch (err) {
          console.log("here1");
          console.log(err);
          show_notification("Something error", "NFT uploading");
        }
        // exportNFT(addressResult, 0.0001, '', imageBlob)
        // .then(res => console.log("success", res))
        // .catch(err => console.log("error", err))
        // .finally( () => show_notification('upload successfully', 'KOI', 'success'))
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };

  useEffect(() => {
    step && setCurStep(parseInt(step));
    queryAddress && setAddress(queryAddress);
  }, [step, queryAddress]);

  useEffect(() => {
    if (detectorAr) {
      window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
      return () => {
        window.removeEventListener("arweaveWalletLoaded", () => {});
      };
    }
  }, [detectorAr]);

  const detectArweaveWallet = async () => {
    try {
      let addr = await arweave.wallets.getAddress();
      console.log("detected arweave wallet address : ", addr);
      if (addr) {
        setAddressArweave(addr);
        setCurStep(2);
        history.push(`/faucet?step=1&address=${addr}`);
      } else {
        show_notification("Error on detectimg Arweave wallet address");
      }
    } catch (err) {
      console.log(err);
      show_notification("Error on detectimg Arweave wallet address");
    }
  };

  return (
    <FaucetContainer>
      <Container>
        <div className="faucet-wrapper">
          <h1 className="f-32 text-blue">Want to earn attention rewards?</h1>
          <h6 className="faucet-description text-blue">
            Get free KOI here so you can upload to the network. Just follow the
            steps below.
          </h6>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            autohide
            delay={3000}
          >
            <Toast.Header>
              <i className="fal fa-info-circle text-warning"></i>
              <strong className="mr-auto ml-2 text-warning">Warning!</strong>
            </Toast.Header>
            <Toast.Body>{errMessage}</Toast.Body>
          </Toast>
          <Carousel
            className="faucet-cards-wrapper"
            pause="hover"
            nextIcon={null}
            prevIcon={null}
            indicators={null}
            activeIndex={curStep}
          >
            <Carousel.Item>
              <div className="faucet-step-card">
                <h1 className="f-32 text-blue">1</h1>
                <div className="step-content">
                  <h6 className="step-title text-blue">
                    Get an Arweave wallet.
                  </h6>
                  <h6 className="text-blue">
                    Already have an Arweave wallet?{" "}
                    <b className="cursor" onClick={onSkipGetWallet}>
                      Skip ahead
                    </b>
                    .
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
                <div className="icon-back" onClick={() => onClickBackTo(0)}>
                  <i className="fal fa-arrow-circle-left"></i>
                </div>
                <h1 className="f-32 text-blue">1</h1>
                <div className="step-content has-wallet">
                  <h6 className="step-title text-blue mb-4">
                    Connect a wallet
                  </h6>
                  <h6 className="text-blue">
                    Paste your Arweave wallet address here.
                  </h6>
                  <div className="submit-wrapper">
                    <Input
                      className="input-address"
                      placeholder="1234567890123456789012345678901234567890123"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {/* <Button
                      className="btn-step-card"
                      onClick={onClickSubmitAddress}
                    >
                      Submit Address
                    </Button> */}
                  </div>
                  <div className="upload-cards-wrapper">
                    <div className="single-ant-file-upload">
                      <Dragger
                        name="file"
                        accept="application/JSON"
                        multiple={false}
                        listType="picture"
                        beforeUpload={beforeJsonUpload}
                        fileList={false}
                        showUploadList={false}
                      >
                        <div className="uploader-container">
                          {uploading ? (
                            <Spin size="large" />
                          ) : (
                            <>
                              <div className="uploader-icon d-flex justify-content-center align-items-center">
                                <Image src={IconUpload} />
                              </div>
                              <p className="text-blue mb-0">
                                Drag & Drop your Arweave keyfile here.
                              </p>
                            </>
                          )}
                        </div>
                      </Dragger>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="faucet-step-card">
                <div className="icon-back" onClick={() => onClickBackTo(0)}>
                  <i className="fal fa-arrow-circle-left"></i>
                </div>
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
                    We will generate the tweet for you. All you need to do is
                    log in and click “Tweet.”
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="faucet-step-card">
                <div className="icon-back" onClick={() => onClickBackTo(2)}>
                  <i className="fal fa-arrow-circle-left"></i>
                </div>
                <h1 className="f-32 text-blue">3</h1>
                <div className="step-content">
                  <h6 className="step-title text-blue">Get KOI</h6>
                  <h6 className="text-blue">
                    After you’ve tweeted, click here to claim your free KOI!
                  </h6>
                  {loading && <div className='text-center w-100'><Spin size="large" /></div>}
                  <Button
                    className="btn-step-card mt-auto mx-auto"
                    onClick={onClickGetKoi}
                  >
                    Get KOI
                  </Button>
                  <p className="text-blue">
                    We will generate the tweet for you. All you need to do is
                    log in and click “Tweet.”
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="faucet-step-card">
                <div className="icon-back" onClick={() => onClickBackTo(3)}>
                  <i className="fal fa-arrow-circle-left"></i>
                </div>
                {/* <h1 className="f-32 text-blue">4</h1> */}
                <div className="step-content congratulation">
                  <h6 className="step-title text-blue text-center">
                    {twMessage}
                  </h6>
                  <h6 className="step-title text-blue">
                    Your KOI balance: {koiBalance}
                  </h6>
                  <h6 className="text-blue text-center">
                    In 3 minutes, you’ll be able to upload content, earn
                    rewards, and much more.
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
        </div>
      </Container>
    </FaucetContainer>
  );
}

export default Faucet;
