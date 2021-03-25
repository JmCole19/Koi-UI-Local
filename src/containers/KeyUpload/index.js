/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { IconUpload } from "assets/images";
import { KeyUploadContainer } from "./style";
import { Col, Row, Upload, Spin } from "antd";
import Arweave from "arweave";
import { getArWalletAddressFromJson } from "service/NFT";
import { DataContext } from "contexts/DataContextContainer";
import { show_notification, convertArBalance } from "service/utils";
import { koi_tools } from "koi_tools"
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { colors } from "theme";

const { Dragger } = Upload;


function KeyUpload() {
  const history = useHistory();
  const {
    setAddressAr,
    keyAr,
    setKeyAr,
    setBalanceKoi,
    setBalanceAr,
  } = useContext(DataContext);
  const [uploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectorAr] = useState(false);

  const getKoi = async () => {
    setLoading(true)
    const ktools = new koi_tools();
    try {
      console.log(keyAr)
      await ktools.loadWallet(keyAr)

      // let temp_address = await ktools.getWalletAddress()
      let arBalance = await ktools.getWalletBalance() // "5500000000000"
      let koiBalance = await ktools.getKoiBalance()
      console.log(convertArBalance(arBalance))
      console.log(Number(koiBalance))
      // setKoiBal(Number(koiBalance))
      setBalanceKoi(Number(koiBalance))
      setBalanceAr(convertArBalance(arBalance))
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log("get koi balance err")
      console.log(err)
      show_notification(err.message, 'KOI')
    }
  }

  const onClickGetKoi = async () => {
    if(!keyAr){
      show_notification("Please upload key json file")
      return false
    }
    await getKoi()
  };

  const beforeJsonUpload = (file) => {
    // console.log('file type : ', file)
    const isJson = file.type === "application/json";
    if (!isJson) {
      show_notification("You can only upload JSON file!");
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
        setKeyAr(arJson)
        setAddressAr(addressResult)
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };

  useEffect(() => {
    if (detectorAr) {
      window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
      return () => {
        window.removeEventListener("arweaveWalletLoaded", () => { });
      };
    }
  }, [detectorAr]);
  
  const detectArweaveWallet = async () => {
    try {
      let arweave = Arweave.init()
      let addr = await arweave.wallets.getAddress();
      console.log("detected arweave wallet address : ", addr);
      if (addr) {
        setAddressAr(addr);
      } else {
        show_notification("Error on detectimg Arweave wallet address");
      }
    } catch (err) {
      console.log(err);
      show_notification("Error on detectimg Arweave wallet address");
    }
  };

  return (
    <KeyUploadContainer>
      <Container>
        <div className="upload-content-wrapper">
          <div className="upload-content">
            <div className="title-wrapper">
              <h1 className="text-blue upload-title">Upload Arweave Wallet Key.</h1>
              <Button
                className="back-wrapper btn-orange"
                onClick={() => history.goBack()}
              >
                <FaArrowLeft size={20} color={colors.blueDark} />
                <h6 className="mb-0 text-blue text-bold ml-2">back</h6>
              </Button>
            </div>
            <div className="upload-body">
              <div className="ant-form ant-form-horizontal">
                <Row>
                  <Col flex="100px">
                    <div className="type-img-wrapper">
                      <Image src={IconUpload} />
                    </div>
                  </Col>
                  <Col flex={1}>
                    <div className="upload-header">
                      <div className="upload-header-title">
                        <div className="header-description w-100">
                          <h6 className="mb-0 text-blue ml-2">Confirm your upload.</h6>
                          <p className="mb-0 text-blue ml-2">Drag & Drop your Arweave keyfile</p>
                        </div>
                      </div>
                    </div>
                    <div className="upload-content-form d-flex justify-content-center"></div>
                  </Col>
                </Row>
                <div className="upload-cards-wrapper">
                  <div className="single-ant-file-upload">
                    <Dragger
                      name="file"
                      accept="application/*"
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
                <div>
                <div className="text-center">
                  {loading && <Spin size="large" /> }
                </div>
                  <Button
                    className="btn-step-card mt-auto mx-auto"
                    onClick={onClickGetKoi}
                  >
                    Get Balance
                                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </KeyUploadContainer>
  );
}

export default KeyUpload;
