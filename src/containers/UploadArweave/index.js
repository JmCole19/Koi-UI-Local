/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Container, Image, Button, Modal } from "react-bootstrap";
import queryString from "query-string";
import Arweave from "arweave";
import { IconArweave, IconUpload } from "assets/images";
import { UploadArweaveContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useHistory, useLocation } from "react-router-dom";
import MyProgress from "components/Elements/MyProgress";
import { DataContext } from "contexts/DataContextContainer";
import { FaTimes } from "react-icons/fa";
import { colors } from "theme";
import { convertArBalance, show_notification, show_fixed_number, get_arweave_option } from "service/utils";
import cloneDeep from "clone-deep";
import { alertTimeout } from "config";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
import { ScaleLoader } from "react-spinners";
import MetaWrapper from "components/Wrappers/MetaWrapper";
import AlertArea from "components/Sections/AlertArea";
import { getKoi } from "service/KOI";

const { TextArea } = Input;
const { Dragger } = Upload;
const arweave = Arweave.init(get_arweave_option);

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 14,
  // },
};

function UploadArweave() {
  const history = useHistory();
  const [form] = useForm();
  const location = useLocation();
  const { step, address } = queryString.parse(location.search);
  console.log("here1 ," , address)
  const {
    addressAr,
    setAddressAr,
    keyAr,
    setKeyAr,
    balanceKoi,
    setBalanceKoi,
    balanceAr,
    setBalanceAr,
  } = useContext(DataContext);
  const [uploading, setUploading] = useState(false);
  const [arToken, setArToken] = useState('');
  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmAlertVariant, setConfirmAlertVariant] = useState('danger');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [canVerify, setCanVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCompleteStep1 = () => {
    history.push(`/upload/arweave?step=2&address=${arToken}`);
  };

  const onCompleteStep2 = () => {
    history.push(`/upload/arweave?step=3&address=${address}`);
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const show_confirm_alert = (message = '', type = 'danger') => {
    setShowConfirmAlert(true)
    setConfirmAlertVariant(type)
    setConfirmMessage(message)
    setTimeout( () => {
      setShowConfirmAlert(false)
      setConfirmMessage('')
    }, alertTimeout)
  }

  const enoughBalance = async (bcKoi, bcAr) => {
    if(Number(bcKoi) < 1 ) {
      show_alert('You don’t have any KOI in your wallet. <br> Hop on over to the <a href="/faucet">KOI Faucet</a> to get some KOI.')
      setCanVerify(false)
      return false
    }else if(Number(bcAr) < Number(1 * 0.0002) ) {
      show_alert('You need more AR to upload.')
      setCanVerify(false)
      return false
    }else{
      setCanVerify(true)
    }
  }

  const checkUpload = async (keyfile) => {
    if(balanceKoi !== null && balanceAr !== null) {
      console.log("balance none zero")
      await enoughBalance(balanceKoi, balanceAr)
    }else {
      setLoading(true)
      console.log("balance retrieving")
      let balance = await getKoi(keyfile)
      setLoading(false)
      setBalanceKoi(Number(balance.koiBalance))
      setBalanceAr(convertArBalance(balance.arBalance))
      await enoughBalance(Number(balance.koiBalance), convertArBalance(balance.arBalance))
    }
  }

  const onClickVerify = () => {
    setShowModal(true)
  };

  const show_alert = (message = '', type = 'danger') => {
    setShowAlert(true)
    setAlertVariant(type)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeContent);
    tpContent[key] = value;
    setActiveContent(tpContent);
  };

  const handleBack = () => {
    history.goBack()
  };

  const onClickCloseConfirmModal = () => {
    setShowModal(false);
  };

  const confirmModalHide = () => {
    if (!uploading) {
      setShowModal(false)
    } else {
      show_notification("You can't close this modal until your NFT has finished uploading.");
    }
  };

  const beforeArweaveKeyfileUpload = (file) => {
    // console.log('file type : ', file)
    const isJson = file.type === "application/json";
    if (!isJson) {
      show_notification("You can only upload a JSON file!");
    }
    const isLt1M = file.size / 1024 < 512;
    if (!isLt1M) {
      show_notification("JSON must smaller than 512KB!");
    }
    if (isJson && isLt1M) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        var arJson = JSON.parse(e.target.result);
        let addressResult = await getArWalletAddressFromJson(arweave, arJson);
        console.log({addressResult})
        setAddressAr(addressResult)
        setKeyAr(arJson);
        await checkUpload(arJson)
        show_alert("Success! Your keyfile has been uploaded.", 'success');
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };

  const uploadNFTContents = async () => {
    try {
      setUploading(true)
      let res = await exportNFT(
        arweave,
        addressAr,
        activeContent,
        activeContent.thumb,
        null,
        keyAr
      );

      if (res) {
        setUploading(false)
        show_notification("Uploaded successfully. Your transaction ID is " + res + ".", "Success", 'success')
        setShowModal(false)
        history.push("/my-content");
      } else {
        show_confirm_alert("Something went wrong uploading your NFT.", "danger");
      }
    } catch (err) {
      console.log("here1");
      console.log(err);
      show_confirm_alert("Something went wrong uploading your NFT.");
    }
  }

  const imageExists = (image_url) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;
  }

  useEffect(() => {
    console.log({address})
    if (address) {
      setIsLoading(true);
      let url = "https://arweave.dev/" + address
      if(imageExists(url)){
        let tpContent = {
          owner: '',
          title: '',
          description: '',
          thumb: url
        }
        console.log({tpContent})
        setActiveContent(tpContent);
      }else{
        show_alert("There is no contents.");
        setTimeout(() => history.replace(`/upload/arweave?step=1`), 2500)
      }
      setIsLoading(false)
      /*
      const options = {
        method: "GET",
      };
      axios
        .get("https://arweave.dev/" + address)
        .then((res) => {
          let data = res.data;
          console.log({ data });
          if (data === 0) {
            show_alert("There is no contents.");
          } else {
            data.thumb = 'https://arweave.dev/' + address
            data.owner = data.name || ''
            console.log(data)
            setActiveContent({...data, address});
          }
        })
        .catch((err) => {
          console.log(err);
          show_alert("There is an error");
        })
        .finally(() => setIsLoading(false));
        */
    }
    
  }, [history.location.pathname]);

  useEffect(() => {
    if (step !== "1" && !address) {
      history.replace(`/upload/arweave?step=1`);
    }
  }, []);
  
  return (
    <MetaWrapper>
      <AlertArea
        showMessage={showAlert}
        variant={alertVariant}
        message={errMessage}
      ></AlertArea>
      {isLoading ? (
          <div className="loading-container text-center mt-4">
            <ScaleLoader size={15} color={"#2a58ad"} />
          </div>
        ) : (
        <UploadArweaveContainer>
          <Container>
            <div className="upload-content-wrapper">
              <div className="upload-content">
                <div className="title-wrapper">
                  <h1 className="text-blue upload-title">Register your content.</h1>
                  {/* <Button
                    className="back-wrapper btn-orange"
                    onClick={() => history.replace("/register-content")}
                  >
                    <FaArrowLeft size={20} color={colors.blueDark} />
                    <h6 className="mb-0 text-blue text-bold ml-2">Leaderboard</h6>
                  </Button> */}
                </div>
                {step === "1" && (
                  <div className="upload-body">
                    <Form
                      layout="horizontal"
                      form={form}
                      {...formItemLayout}
                      onFinish={onCompleteStep1}
                    >
                      <Row>
                        <Col flex="100px">
                          <div className="type-img-wrapper">
                            <Image src={IconArweave} />
                          </div>
                        </Col>
                        <Col flex={1}>
                          <div className="upload-header">
                            <div className="upload-header-title">
                              <div className="upload-step">
                                <MyProgress value={1} />
                              </div>
                              <h6 className="mb-0 text-blue ml-2">
                                Enter the Arweave ID for your NFT.
                              </h6>
                            </div>
                          </div>
                          <div className="upload-content-form">
                            <div className="upload-content-row">
                              <Form.Item label="Arweave ID:">
                                <Input
                                  placeholder="Arweave transaction id"
                                  className="arweave-value-input"
                                  value={arToken}
                                  onChange={(e) => setArToken(e.target.value)}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Form.Item>
                        <Button type="submit" className="btn-blueDark mx-auto px-5">
                          Register your NFT
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )}
                {step === "2" && (
                  <div className="upload-body">
                    <Form
                      layout="horizontal"
                      form={form}
                      {...formItemLayout}
                      onFinish={onCompleteStep2}
                    >
                      <Row>
                        <Col flex="100px">
                          <div className="type-img-wrapper">
                            <Image src={IconArweave} />
                          </div>
                        </Col>
                        <Col flex={1}>
                          <div className="upload-header">
                            <div className="upload-header-title">
                              <div className="upload-step">
                                <MyProgress value={2} />
                              </div>
                              <h6 className="mb-0 text-blue ml-2">
                                Confirm the information for your upload.
                              </h6>
                            </div>
                            <div className="icon-back cursor" onClick={handleBack}>
                              <i className="fal fa-arrow-circle-left"></i>
                            </div>
                          </div>
                          <div className="upload-content-form">
                            <div className="content-img-wrapper">
                              <Image src={activeContent?.thumb} className="w-100" />
                            </div>
                            <div className="upload-content-row">
                              <Form.Item>
                                <div className="left">
                                  <p className="mb-0">Title</p>
                                </div>
                                <Input
                                  value={activeContent?.title}
                                  onChange={(e) =>
                                    updateContent("title", e.target.value)
                                  }
                                  placeholder=""
                                  className="ethereum-value-input"
                                />
                              </Form.Item>
                              <Form.Item>
                                <div className="left">
                                  <p className="mb-0">Owner</p>
                                </div>
                                <Input
                                  placeholder=""
                                  className="ethereum-value-input"
                                  value={activeContent?.owner}
                                  onChange={(e) =>
                                    updateContent("owner", e.target.value)
                                  }
                                />
                              </Form.Item>
                              <Form.Item>
                                <div className="left">
                                  <p className="mb-0">Description</p>
                                </div>
                                <TextArea
                                  placeholder=""
                                  value={activeContent?.description}
                                  onChange={(e) =>
                                    updateContent("description", e.target.value)
                                  }
                                  className="ethereum-value-input"
                                  rows={5}
                                />
                              </Form.Item>
                              <Form.Item>
                                <div className="left" />
                                <Button
                                  type="submit"
                                  className="btn-blueDark btn-confirm"
                                >
                                  Upload Your Arweave Keyfile
                                </Button>
                              </Form.Item>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                )}
                {step === "3" && (
                  <div className="upload-body">
                    <Form
                      layout="horizontal"
                      form={form}
                      {...formItemLayout}
                      onFinish={onCompleteStep3}
                    >
                      <Row>
                        <Col flex="100px">
                          <div className="type-img-wrapper">
                            <Image src={IconArweave} />
                          </div>
                        </Col>
                        <Col flex={1}>
                          <div className="upload-header">
                            <div className="upload-header-title">
                              <div className="upload-step">
                                <MyProgress value={3} />
                              </div>
                              <div className="header-description w-100">
                                <h6 className="mb-0 text-blue ml-2">
                                  Upload your arweave keyfile.
                                </h6>
                                <p className="mb-0 text-blue ml-2">
                                  Drag & Drop your Arweave keyfile or connect using
                                  an{" "}
                                  <a
                                    href="https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-bold"
                                  >
                                    Arweave browser extension
                                  </a>
                                  .
                                </p>
                              </div>
                            </div>
                            <div className="icon-back cursor" onClick={handleBack}>
                              <i className="fal fa-arrow-circle-left"></i>
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
                            beforeUpload={beforeArweaveKeyfileUpload}
                            // fileList={false}
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
                      <div className="text-center">
                        {loading && (
                          <Spin size="large" tip="get KOI balance" />
                        )}
                      </div>
                      <div className="upload-cards-wrapper">
                        <Button
                          className="btn-back btn-blueDark"
                          disabled={!canVerify}
                          onClick={onClickVerify}
                        >
                          Finish Upload
                        </Button>
                      </div>
                    </Form>
                    <p className="footer-description text-blue">
                      Don’t have any Arweave (AR) tokens? Visit the{" "}
                      <a href="/faucet" target="_blank">
                        Arweave Faucet
                      </a>{" "}
                      to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Modal
              show={showModal}
              centered
              dialogClassName="modal-confirm-transaction"
              onHide={confirmModalHide}
            >
              <Modal.Body>
                <FaTimes
                  className="icon-close cursor"
                  color={colors.blueDark}
                  size={24}
                  onClick={onClickCloseConfirmModal}
                />
                <h2 className="modal-title text-blue">Confirm transaction</h2>
                <div className="imgs-wrapper">
                  <Space size={28}>
                    <Image
                        className="br-4"
                        src={activeContent?.thumb}
                        width={40}
                      />
                  </Space>
                </div>
                <>
                  <div className="modal-row mb-2">
                    <div className="modal-row-left">
                      <p className="text-blue mb-0">
                        AR to upload: <b>0.0002 AR</b> / NFT{" "}
                      </p>
                    </div>
                    <div className="modal-row-right">
                      <p className="text-blue mb-0">
                        x {1} upload
                      </p>
                    </div>
                  </div>
                  <div className="modal-row mb-4">
                    <div className="modal-row-left">
                      <p className="text-blue mb-0">
                        KOI to upload: <b>1.0 KOI</b> / NFT{" "}
                      </p>
                    </div>
                    <div className="modal-row-right">
                      <p className="text-blue mb-0">
                        x {1} upload
                      </p>
                    </div>
                  </div>
                  <h6 className="text-blue">
                    <b>Estimated Total</b>
                  </h6>
                  <h6 className="text-blue">
                    {show_fixed_number(1 * 0.0002, 4)} AR
                  </h6>
                  <h6 className="text-blue">
                    {show_fixed_number(1 * 1, 1)} KOI
                  </h6>
                  <AlertArea
                    showMessage={showConfirmAlert}
                    variant={confirmAlertVariant}
                    message={confirmMessage}
                  ></AlertArea>
                  {!uploading && (
                    <Button
                      className="btn-blueDark btn-connect"
                      onClick={uploadNFTContents}
                    >
                      Confirm & Upload
                    </Button>
                  )}
                  {uploading && (
                    <Spin size="large" tip="uploading" />
                  )}
                </>
              </Modal.Body>
            </Modal>
          </Container>
        </UploadArweaveContainer> 
      )}
    </MetaWrapper>
  );
}

export default UploadArweave;
