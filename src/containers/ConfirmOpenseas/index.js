/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Button, Modal } from "react-bootstrap";
import queryString from "query-string";
import cloneDeep from "clone-deep";
import {
  IconArConnect,
  IconHtml,
  IconOpenSea,
  IconShare,
  IconUpload,
  ItemTemp,
} from "assets/images";
import { ConfirmOpenseasContainer, SingleAntFileUpload } from "./style";
import { Col, Form, Input, Row, Upload, Spin, Progress, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useHistory, useLocation } from "react-router-dom";
import { colors } from "theme";
import { DataContext } from "contexts/DataContextContainer";
import { FaTimes } from "react-icons/fa";
import Arweave from "arweave";
import { show_notification, show_fixed_number, convertArBalance, get_arweave_option } from "service/utils";
import { exportNFT, getArWalletAddressFromJson } from "service/NFT";
import AlertArea from "components/Sections/AlertArea";
import {alertTimeout} from 'config'
import ModalContent from "components/Elements/ModalContent";
import { getKoi } from "service/KOI";
import MetaWrapper from "components/Wrappers/MetaWrapper";

const arweave = Arweave.init(get_arweave_option);
const { TextArea } = Input;
const { Dragger } = Upload;
const modes = {
  change: "change",
  complete: "complete",
  confirm: "confirm",
  confirm1: "confirm1",
  uploading: "uploading",
  uploadKey: "uploadKey",
};

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 14,
  // },
};

const successCompleteMessage = 'We are experimenting with the bundler nodes so it may take a few minutes before your NFT is displayed. Make some coffee then come back to check it out.';

function ConfirmOpenseas() {
  const history = useHistory();
  const {
    openSeas,
    setOpenSeas,
    addressAr,
    keyAr,
    setKeyAr,
    balanceKoi,
    setBalanceKoi,
    balanceAr,
    setBalanceAr,
    setAddressAr
  } = useContext(DataContext);
  const [form] = useForm();
  const location = useLocation();
  const { step = "1", selected, address } = queryString.parse(location.search);
  const [uploading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);
  const [mode, setMode] = useState("change"); // change | confirm | uploadKey | uploading | complete
  const [activeOpenSea, setActiveOpenSea] = useState({
    id: 0,
    thumb: "",
    title: "",
    owner: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [uploadContents, setUploadContents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  var selectedIds = selected.split("_");
  // const [detectorAr] = useState(false);
  // const [walletKey, setWalletKey] = useState(null);
  const [updatingProcess, setUploadingProcess] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [errMessage, setErrMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState(true);

  const show_alert = (message = '', type = 'danger') => {
    setShowAlert(true)
    setAlertVariant(type)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  const onSwitchModal = () => {
    setModalType(modalType === "share" ? "embed" : "share");
  };

  const onClickContent = (t_item, type) => {
    let item = {
      txIdContent: t_item.txId,
      name: t_item.title
    }
    console.log("sharing item")
    console.log(t_item)
    console.log(item)
    setSelectedContent(item);
    setModalType(type);
    setShowShareModal(true);
  };

  const handleBack = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        let newStep = activeStep - 1;
        setActiveOpenSea(uploadContents[newStep - 1]);
        setActiveStep(newStep);
        break;
      case "confirm":
        // setActiveStep(activeStep)
        setMode(modes.change);
        break;
      case "uploadKey":
        setMode(modes.change);
        break;
      case "uploading":
        setMode(modes.change);
        break;
      case "complete":
        setMode(modes.change);
        break;
      default:
        setMode(modes.change);
        break;
    }
  };

  const formValidation = () => {
    if(!activeOpenSea.title || !activeOpenSea.owner || !activeOpenSea.description) {
      show_alert("We couldn't find any details about this NFT on the blockchain. <br> Please enter the information in order to collect KOI.")
      return false
    }
    return true
  }

  const enoughBalance = async (bcKoi, bcAr) => {
    console.log("koi balance : ", Number(bcKoi))
    console.log("ar balance : ", Number(bcAr))
    if(Number(bcKoi) < uploadContents.length ) {
      setErrMessage("You don't have enough KOI to upload these NFTs. Visit the KOI Faucet to get some KOI.")
      return false
    }else if(Number(bcAr) < Number(uploadContents.length * 0.0002) ) {
      setErrMessage('You need more AR to upload.')
      return false
    }else{
      await uploadNFTContents()
    }
  }

  const checkUpload = async () => {
    if(!keyAr) {
      show_notification('Please upload your json keyfile.')
      setMode("uploadKey");
    }else {
      if(mode !== modes.confirm) setMode("confirm")
      if(balanceKoi !== null && balanceAr !== null) {
        enoughBalance(balanceKoi, balanceAr)
      }else {
        setLoading(true)
        let balance = await getKoi(keyAr)
        setLoading(false)
        setBalanceKoi(Number(balance.koiBalance))
        setBalanceAr(convertArBalance(balance.arBalance))
        enoughBalance(Number(balance.koiBalance), convertArBalance(balance.arBalance))
        // setTimeout( () => enoughBalance(), 100)
      }
    }
  }

  const uploadNFTContents = async () => {
    setMode("uploading");
    // uploading process
    let tpUpdatingProcess = updatingProcess;
    let tempUploadContents = uploadContents
    for (let content of uploadContents) {
      try {
        let res = await exportNFT(
          arweave,
          addressAr,
          content,
          content.thumb,
          null,
          keyAr
        );
        console.log(res);
        tpUpdatingProcess++;

        if (res) {
          setUploadingProcess(tpUpdatingProcess);
          
          let t_i_CT = tempUploadContents.findIndex((_tc) => _tc.id === content.id);
          if (tempUploadContents[t_i_CT]) {
            tempUploadContents[t_i_CT].txId = res
          }
        } else {
          setUploadingProcess(tpUpdatingProcess);
          show_notification(
            "There is an error uploading '" +
              content.title +
              "' "
          );
        }
        /*
        if (tpUpdatingProcess + 1 === uploadContents.length) {
          // close modal
          setShowModal(false);
          show_notification("Upload finished", "KOI", "success");
          // show complete section
          setTimeout(() => {
            setMode("complete");
          }, 2000);
        }
        */
      } catch (err) {
        console.log("error - exportNFT", err);
        show_alert("Something went wrong uploading your NFT.", "KOI", "error");
      }
    }
    // close modal
    setShowModal(false);
    show_alert("Upload finished.", "success");
    // show complete section
    setTimeout(() => {
      setMode("complete");
    }, 2000);
    tempUploadContents = tempUploadContents.filter( uc => uc.txId !== '')
    setUploadContents(tempUploadContents)
  }
  const onClickConfirm = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        // console.log("here1", activeStep, uploadContents.length)
        if(!formValidation()){
          break;
        }
        if (activeStep === uploadContents.length) {
          console.log("here2")
          setMode("confirm");
          setShowModal(true);
        } else {
          console.log("here1.2")
          setActiveStep(activeStep + 1);
          setActiveOpenSea(uploadContents[activeStep]);
        }
        break;
      case "confirm":
        checkUpload()
        // setDetectorAr(true)
        break;
      // case 'uploadKey':
      //   setDetectorAr(true)
      //   break;
      case "uploading":
        setMode("complete");
        break;
      case "complete":
        // go to myContent page
        history.push("/contents");
        break;
      default:
        setMode(modes.change);
        break;
    }
  };

  const onClickEditLater = () => {
    let tpContents = cloneDeep(uploadContents);
    tpContents.splice(activeStep - 1, 1);
    if (tpContents.length) {
      if (activeStep >= tpContents.length) {
        setActiveOpenSea(tpContents[tpContents.length - 1]);
        setUploadContents(tpContents);
        setActiveStep(tpContents.length);
      } else {
        setActiveOpenSea(tpContents[activeStep]);
        setUploadContents(tpContents);
      }
    } else {
      // back to select page
      history.goBack();
    }
  };

  const onClickCloseConfirmModal = () => {
    setShowModal(false);
    setMode(modes.change);
  };

  const confirmModalHide = () => {
    if (mode === modes.confirm) {
      setShowModal(false);
      setMode(modes.change);
    } else {
      show_notification("You can't close this modal until your NFT has finished uploading.");
    }
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const onConnectWallet = () => {
    checkUpload()
    // setMode("uploadKey");
  };

  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeOpenSea);
    tpContent[key] = value;
    setActiveOpenSea(tpContent);
    let tpUploadContents = cloneDeep(uploadContents);
    tpUploadContents[activeStep-1] = tpContent
    setUploadContents(tpUploadContents)
  };

  const checkConfirmMessage = () => {
    console.log('click confirm cancel message')
    setConfirmMessage(false)
  };

  useEffect(() => {
    let contentsOS = [];
    selectedIds.forEach((tId) => {
      let tempOpenSea = openSeas.find((_openSea) => tId == _openSea.id);
      if (tempOpenSea) {
        contentsOS.push({
          id: tempOpenSea?.id || 0,
          thumb: tempOpenSea?.image_thumbnail_url || "",
          title: tempOpenSea?.name || "",
          owner: tempOpenSea?.owner?.user?.username || "",
          description: tempOpenSea?.description || "",
          txId: ''
        });
      }
    });
    if (contentsOS.length > 0) {
      let firstOpenSea = contentsOS[0];
      setActiveOpenSea(firstOpenSea);
      setActiveStep(1);
    }
    setUploadContents(contentsOS);
  }, [step, openSeas]);

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
        let addressResult = await getArWalletAddressFromJson(arweave, arJson);
        setAddressAr(addressResult);
        setKeyAr(arJson);
        setMode("confirm")
        // setDetectorAr(true);
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    }
    return isJson && isLt1M;
  };

  useEffect(() => {
    if (address) {
      const options = {
        method: "GET",
        // params: {
        //   owner: "0x3a3d6f2b81187Bd4c365b6dAfB260b59f5783854",
        // },
      };

      fetch(
        // `https://api.opensea.io/api/v1/assets?owner=0xd703accc62251189a67106f22d54cd470494de40&order_direction=desc&offset=0&limit=20`,
        `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`,
        options
      )
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          console.log({ data });
          setOpenSeas(data.assets);
        });
    }
  }, [history.location.pathname]);

  return (
    <MetaWrapper>
      <AlertArea
        showMessage={showAlert}
        variant={alertVariant}
        message={errMessage}
      ></AlertArea>
      {mode === modes.complete && (
        <AlertArea
          showMessage={confirmMessage}
          variant="success"
          message={successCompleteMessage}
          cancel={checkConfirmMessage}
          showCancel={true}
        ></AlertArea>
      )}
      <ConfirmOpenseasContainer>
        {mode !== modes.complete && (
          <Progress
            className="d-md-none progress-sm"
            strokeColor={colors.green}
            trailColor={colors.white}
            percent={(activeStep * 100) / uploadContents.length}
            status="active"
            showInfo={false}
          />
        )}
        <Container>
          <div className="upload-content-wrapper">
            <div className="upload-content">
              <div
                className={`title-wrapper ${
                  mode === modes.complete && "d-none d-md-block"
                }`}
              >
                {mode !== modes.complete ? (
                  <h1 className="text-blue upload-title">
                    Register your content
                  </h1>
                ) : (
                  <h1 className="text-blue upload-title d-none d-md-block">
                    Your NFTs are stored forever.
                  </h1>
                )}
                {/* {mode !== modes.complete && (
                  <Button
                    className="back-wrapper btn-orange"
                    onClick={() => history.push(`/opensea?address=${address}`)}
                  >
                    <FaArrowLeft size={20} color={colors.blueDark} />
                    <h6 className="mb-0 text-blue text-bold ml-2">Leaderboard</h6>
                  </Button>
                )} */}
              </div>
              {/* <h1 className="upload-title text-blue">Register your content.</h1> */}
              <div className="upload-wrapper">
                {activeStep !== 1 && (
                  <div className="icon-back cursor" onClick={handleBack}>
                    <i className="fal fa-arrow-circle-left"></i>
                  </div>
                )}
                {mode !== modes.complete && (
                  <Form
                    layout="horizontal"
                    form={form}
                    {...formItemLayout}
                    onFinish={onClickConfirm}
                  >
                    <Row>
                      <Col flex="100px" className="d-none d-md-block">
                        <div className="type-img-wrapper">
                          <Image src={IconOpenSea} />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <div className="upload-header">
                          <div className="upload-header-title">
                            <div className="type-img-wrapper d-md-none">
                              <Image src={IconOpenSea} />
                            </div>
                            <h6 className="mb-0 text-blue ml-2">
                              Confirm the information for your upload.
                            </h6>
                          </div>
                        </div>
                        <div className="upload-content-form">
                          <div className="content-img-wrapper">
                            <Image src={activeOpenSea.thumb || ItemTemp} />
                          </div>
                          <div className="upload-content-row">
                            <Form.Item>
                              <div className="left">
                                <p className="mb-0">Title</p>
                              </div>
                              <Input
                                value={activeOpenSea.title}
                                onChange={(e) =>
                                  updateContent("title", e.target.value)
                                }
                                placeholder="input placeholder"
                                className="ethereum-value-input"
                              />
                            </Form.Item>
                            <Form.Item>
                              <div className="left">
                                <p className="mb-0">Owner</p>
                              </div>
                              <Input
                                placeholder="input placeholder"
                                className="ethereum-value-input"
                                value={activeOpenSea.owner}
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
                                placeholder="input placeholder"
                                value={activeOpenSea.description}
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
                                Confirm
                              </Button>
                              <Button
                                className="btn-white btn-edit ml-3"
                                onClick={onClickEditLater}
                              >
                                Later
                              </Button>
                            </Form.Item>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
                {mode === modes.confirm1 && (
                  <Form
                    layout="horizontal"
                    form={form}
                    {...formItemLayout}
                    onFinish={onCompleteStep3}
                  >
                    <Row>
                      <Col flex="100px">
                        <div className="type-img-wrapper">
                          <Image src={IconOpenSea} />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <div className="upload-header">
                          <div className="upload-header-title">
                            <div className="header-description w-100">
                              <h6 className="mb-0 text-blue ml-2">
                                Confirm your upload.
                              </h6>
                              <p className="mb-0 text-blue ml-2">
                                Drag & Drop your Arweave keyfile or connect using
                                an{" "}
                                <a href="#/" className="text-bold">
                                  Arweave browser extension
                                </a>
                                .
                              </p>
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
                          multiple={false}
                          listType="picture"
                          // beforeUpload={beforeUpload}
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
                                  Drag & Drop your Ethereum keyfile here.
                                </p>
                              </>
                            )}
                          </div>
                        </Dragger>
                        {/* {src.length > 0 && <p>{src[0].originalname.split('.')[1]}</p>} */}
                        {/* <p className="text-secondary">dddddd</p> */}
                      </div>
                      <div className="arConnect-card" onClick={onClickConfirm}>
                        <div className="card-icon">
                          <Image src={IconArConnect} />
                        </div>
                        <p className="text-blue text-center mb-0">
                          Click here to open ArConnect browser extension.{" "}
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
                {mode === modes.complete && (
                  <div className="congrats">
                    <Row>
                      <Col flex="100px" className="d-none d-md-block">
                        <div className="type-img-wrapper">
                          <Image src={IconOpenSea} />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <div className="upload-header">
                          <div className="upload-header-title">
                            <div className="header-description w-100">
                              <h6 className="mb-0 text-blue ml-2">
                                Congratulations!
                              </h6>
                              <p className="mb-0 text-blue ml-2">
                                You’ll start earning KOI as soon as someone views your content.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="upload-content-form d-flex justify-content-center"></div>
                      </Col>
                    </Row>
                    <div className="uploaded-cards-wrapper">
                      {uploadContents.length > 0 &&
                        uploadContents
                          .map((_selected, _i) => (
                            <div key={_i} className="uploaded-card">
                              <div className="card-content-wrapper">
                                <Image src={_selected.thumb} height="100" />
                                <p className="text-blue">{_selected.title}</p>
                                <p className="text-blue font-light text-italic mt-0">pending</p>
                              </div>
                              <div className="uploaded-card-btns-sm d-none d-md-flex">
                                <Button className="btn-blueDark mr-2" onClick={() => onClickContent(_selected, "share")} >
                                  <Image src={IconShare} width={17} className="mr-2" />
                                  Share
                                </Button>
                                <Button className="btn-white btn-html" onClick={() => onClickContent(_selected, "embed")}>
                                  <Image src={IconHtml} width={17} />
                                </Button>
                              </div>
                              <div className="uploaded-card-btns-sm d-md-none">
                                <Button className="btn-blueDark" onClick={() => onClickContent(_selected, "share")}>
                                  <Image
                                    src={IconShare}
                                    className="mr-2"
                                    width={17}
                                  />
                                  Share
                                </Button>
                                <Button className="btn-white btn-html" onClick={() => onClickContent(_selected, "embed")}>
                                  <Image
                                    src={IconHtml}
                                    className="mr-2"
                                    width={17}
                                  />
                                  Embed
                                </Button>
                              </div>
                            </div>
                          ))}
                    </div>
                    <Button
                      className="btn-blueDark btn-see-contents mx-auto"
                      onClick={() => history.replace("/my-content")}
                    >
                      See My Content
                    </Button>
                  </div>
                )}
                {mode !== modes.complete && (
                  <Progress
                    className="d-none d-md-block"
                    strokeColor={colors.blueDark}
                    trailColor={colors.blueLight}
                    percent={(activeStep * 100) / uploadContents.length}
                    status="active"
                    showInfo={false}
                  />
                )}
              </div>
            </div>
          </div>
          <ModalContent
            type={modalType}
            show={showShareModal}
            detail={selectedContent}
            onHide={() => setShowShareModal(false)}
            onSwitchModal={onSwitchModal}
          />
          <Modal
            show={showModal}
            centered
            dialogClassName="modal-confirm-transaction"
            onHide={confirmModalHide}
          >
            <Modal.Body>
              {mode === modes.confirm && (
                <FaTimes
                  className="icon-close cursor"
                  color={colors.blueDark}
                  size={24}
                  onClick={onClickCloseConfirmModal}
                />
              )}
              {mode === modes.confirm && (
                <h2 className="modal-title text-blue">Confirm transaction</h2>
              )}
              {mode === modes.uploading && (
                <h2 className="modal-title text-blue">
                  Your NFTs are uploading...
                </h2>
              )}
              <div className="imgs-wrapper">
                <Space size={28}>
                  {uploadContents.map((c, key) => (
                    <Image
                      className="br-4"
                      src={c.thumb || ItemTemp}
                      width={40}
                      key={key}
                    />
                  ))}
                </Space>
              </div>
              {mode === modes.confirm && (
                <>
                  <div className="modal-row mb-2">
                    <div className="modal-row-left">
                      <p className="text-blue mb-0">
                        AR to upload: <b>0.0002 AR</b> / NFT{" "}
                      </p>
                    </div>
                    <div className="modal-row-right">
                      <p className="text-blue mb-0">
                        x {uploadContents.length} uploads
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
                        x {uploadContents.length} uploads
                      </p>
                    </div>
                  </div>
                  <h6 className="text-blue">
                    <b>Estimated Total</b>
                  </h6>
                  <h6 className="text-blue">
                    {show_fixed_number(uploadContents.length * 0.0002, 4)} AR
                  </h6>
                  <h6 className="text-blue">
                    {show_fixed_number(uploadContents.length * 1, 1)} KOI
                  </h6>
                  <div className="text-center">
                    {loading && (
                      <Spin size="large" tip="get KOI balance" />
                    )}
                  </div>
                  {errMessage && <p className='text-center text-danger'>{errMessage}</p>}
                  <Button
                    className="btn-blueDark btn-connect"
                    onClick={onConnectWallet}
                  >
                    Confirm & Upload
                  </Button>
                </>
              )}
              {mode === modes.uploadKey && (
                <>
                  <div className="upload-cards-wrapper">
                    <SingleAntFileUpload>
                      <Dragger
                        name="file"
                        accept="application/*"
                        multiple={false}
                        listType="picture"
                        beforeUpload={beforeJsonUpload}
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
                    </SingleAntFileUpload>
                  </div>
                </>
              )}
              {mode === modes.uploading && (
                <>
                  <div className="modal-row mb-2 text-center">
                    <div className="modal-row-center custom-pd">
                      <p className="text-blue mb-0">
                        Don’t navigate away from this page or close your browser
                        tab. It can disrupt the uploading process.
                      </p>
                      <p className="text-blue mb-2">
                        Storing them forever should only take a few minutes.
                      </p>
                    </div>
                  </div>
                  <h6 className="text-blue">
                    <b>Loading</b>
                  </h6>
                  <Progress
                    strokeColor={colors.blueDark}
                    trailColor={colors.blueLight}
                    percent={(updatingProcess * 100) / uploadContents.length}
                    status="active"
                    showInfo={false}
                  />
                </>
              )}
            </Modal.Body>
          </Modal>
        </Container>
      </ConfirmOpenseasContainer>
    </MetaWrapper>
  );
}

export default ConfirmOpenseas;
