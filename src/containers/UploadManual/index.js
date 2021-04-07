/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Container, Image, Button, Modal } from "react-bootstrap";
import queryString from "query-string";
import { IconUpload } from "assets/images";
import { UploadUploadContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import cloneDeep from "clone-deep";
import { useHistory, useLocation } from "react-router-dom";
import MyProgress from "components/Elements/MyProgress";
// import ArconnectCard from "components/Elements/ArconnectCard";
import { convertArBalance, show_notification, show_fixed_number } from "service/utils";
import Arweave from "arweave";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
// import { colors } from "theme";
// import { FaArrowLeft } from "react-icons/fa";
import { DataContext } from "contexts/DataContextContainer";
import AlertArea from "components/Sections/AlertArea";
import { alertTimeout } from "config";
import { getKoi } from "service/KOI";
import { FaTimes } from "react-icons/fa";
import { colors } from "theme";
import useDebounce from "components/Utils/useDebounce";

const arweave = Arweave.init();
const { TextArea } = Input;
const { Dragger } = Upload;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 14,
  // },
};

function UploadManual() {
  const history = useHistory();
  const [form] = useForm();
  const location = useLocation();
  const { step } = queryString.parse(location.search);
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState('');
  // const [imageBlob, setImageBlob] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [confirmAlertVariant, setConfirmAlertVariant] = useState('danger');
  const [errMessage, setErrMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [activeContent, setActiveContent] = useState({
    title: "",
    owner: "",
    description: "",
  });
  const [detectorAr] = useState(false); //, setDetectorAr
  const [canVerify, setCanVerify] = useState(false);
  const updatedBalanceKoi = useDebounce(balanceKoi, 500);

  const onCompleteStep1 = () => {
    history.push(`/upload/manual?step=2`);
  };

  const onCompleteStep2 = () => {
    if (
      activeContent.title &&
      activeContent.owner &&
      activeContent.description
    ) {
      history.push(`/upload/manual?step=3`);
    } else {
      show_alert("Please fill out all fields.", "danger");
    }
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeContent);
    tpContent[key] = value;
    setActiveContent(tpContent);
  };

  const handleBack = () => {
    history.goBack()
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

  const show_confirm_alert = (message = '', type = 'danger') => {
    setShowConfirmAlert(true)
    setConfirmAlertVariant(type)
    setConfirmMessage(message)
    setTimeout( () => {
      setShowConfirmAlert(false)
      setConfirmMessage('')
    }, alertTimeout)
  }
  
  const uploadNFTContents = async () => {
    try {
      setUploading(true)

      let res = await exportNFT(
        arweave,
        addressAr,
        activeContent,
        imageUrl,
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

  const enoughBalance = async () => {
    if(Number(balanceKoi) < 1 ) {
      show_confirm_alert('You don’t have any KOI in your wallet. <br> Hop on over to the <a href="/faucet">KOI Faucet</a> to get some KOI.')
      setCanVerify(false)
      return false
    }else if(Number(balanceAr) < Number(1 * 0.0002) ) {
      show_confirm_alert('You need more AR to upload.')
      setCanVerify(false)
      return false
    }else{
      setCanVerify(true)
    }
  }

  const checkUpload = async (keyfile) => {
    if(balanceKoi !== null && balanceAr !== null) {
      await enoughBalance()
    }else {
      setLoading(true)
      let balance = await getKoi(keyfile)
      setLoading(false)
      setBalanceKoi(Number(balance.koiBalance))
      setBalanceAr(convertArBalance(balance.arBalance))
    }
  }

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
        await checkUpload(arJson)
        show_alert("Success! Your keyfile has been uploaded.", 'success');
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };
  const beforeNftUpload = (file) => {
    console.log(file)
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      show_notification("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      show_notification("Image must be smaller than 10MB!");
    }
    if (isJpgOrPng && isLt2M) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let ex = file.name.split('.').pop();
        let filename = file.name.split('.').slice(0, -1).join('.')
        if(filename.length > 20) filename = filename.substr(0, 18) + '~.'
        setImagePath(filename + ex)
        setImageUrl(e.target.result);
        // fetch(e.target.result)
        //   .then(function (response) {
        //     return response.blob();
        //   })
        //   .then(function (blob) {
        //     setImageBlob(blob);
        //   });
      };
      // setImageBlob(file)
      reader.readAsDataURL(file);
      // Prevent upload
      return false;
    }
    return isJpgOrPng && isLt2M;
    // if ( ['png', 'jpeg', 'jpg', 'gif', 'mp4'].includes(fileExt.toLowerCase()) ) {
    //   let fileList = [file]
    //   // set fileList
    //   return false
    // } else {
    //   // show_notification('Please input only image and video.')
    // }
  };

  // const onOpenArConnect = () => {
  //   setDetectorAr(true)
  // };

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

  useEffect(() => {
    if(step === "3" && balanceKoi !== null && balanceAr !== null){
      console.log("here is focus")
      enoughBalance()
    }
  }, updatedBalanceKoi)

  const onClickVerify = () => {
    setShowModal(true)
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
        if(keyAr) {
          await checkUpload(keyAr)
        }else{
          show_alert('Connect your wallet.')
        }
      } else {
        show_alert("Error detecting Arweave wallet address.");
      }
    } catch (err) {
      console.log(err);
      show_alert("Error detecting Arweave wallet address.");
    }
  };

  useEffect(() => {
    if (step !== "1" && !imageUrl) {
      history.replace(`/upload/manual?step=1`);
    }
  }, []);

  return (
    <>
      <AlertArea
        showMessage={showAlert}
        variant={alertVariant}
        message={errMessage}
      ></AlertArea>
      <UploadUploadContainer>
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
                          <Image src={IconUpload} />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <div className="upload-header">
                          <div className="upload-header-title">
                            <div className="upload-step">
                              <MyProgress value={1} />
                            </div>
                            <h6 className="mb-0 text-blue ml-2">
                              Select a file to upload to the permaweb.
                            </h6>
                          </div>
                          <div className="icon-back cursor" onClick={handleBack}>
                            <i className="fal fa-arrow-circle-left"></i>
                          </div>
                        </div>
                        <div className="upload-image-form">
                          <div className="upload-content-row">
                            <div className="single-ant-file-upload">
                              <Dragger
                                name="file"
                                accept="video/*, image/*"
                                multiple={false}
                                listType="picture"
                                beforeUpload={beforeNftUpload}
                                // fileList={false}
                                showUploadList={false}
                              >
                                {uploading ? (
                                  <Spin size="large" />
                                ) : (
                                  <>
                                    <div className="uploader-container">
                                      <div className="uploader-icon d-flex justify-content-center align-items-center">
                                        {imageUrl ? <Image src={imageUrl} /> : <Image src={IconUpload} />}
                                      </div>
                                      {imagePath ? 
                                      <p className="text-blue mt-1"><b>{imagePath}</b></p> 
                                      : <p className="text-blue mb-0">Drag & Drop or click to browse your computer.</p>}
                                    </div>
                                  </>
                                )}
                              </Dragger>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button
                        type="submit"
                        disabled={!imageUrl}
                        className="btn-blueDark mx-auto px-5"
                      >
                        Add Details
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
                          <Image src={IconUpload} />
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
                            <Image src={imageUrl} className="w-100" />
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
                          <Image src={IconUpload} />
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
                      src={imageUrl}
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
      </UploadUploadContainer>
    </>
  );
}

export default UploadManual;
