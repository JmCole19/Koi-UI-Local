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
import { show_notification, show_fixed_number } from "service/utils";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";

const arweave = Arweave.init();
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

function ConfirmOpenseas() {
  const history = useHistory();
  const {
    openSeas,
    setOpenSeas,
    addressAr,
    setAddressAr,
  } = useContext(DataContext);
  const [form] = useForm();
  const location = useLocation();
  const { step = "1", selected, address } = queryString.parse(location.search);
  const [uploading] = useState(false);
  const [mode, setMode] = useState("complete"); // change | confirm | uploadKey | uploading | complete
  const [activeOpenSea, setActiveOpenSea] = useState({
    id: 0,
    thumb: "",
    title: "",
    owner: "",
    description: "",
  });
  const [activeStep, setActiveStep] = useState(1);
  const [uploadContens, setUploadContents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  var selectedIds = selected.split("_");
  const [detectorAr, setDetectorAr] = useState(false);
  const [walletKey, setWalletKey] = useState(null);
  const [updatingProcess, setUploadingProcess] = useState(0);

  const handleBack = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        let newStep = activeStep - 1;
        setActiveOpenSea(uploadContens[newStep - 1]);
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

  const onClickConfirm = () => {
    switch (
      mode // change | confirm | uploadKey | uploading | complete
    ) {
      case modes.change:
        if (activeStep === uploadContens.length) {
          setMode("confirm");
          setShowModal(true);
        } else {
          setActiveStep(activeStep + 1);
          setActiveOpenSea(uploadContens[activeStep]);
        }
        break;
      case "confirm":
        setMode("uploadKey");
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
    let tpContents = cloneDeep(uploadContens);
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
      show_notification("You can't close this modal until NFT uploaded.");
    }
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const onConnectWallet = () => {
    // setRequiredKey(true)
    setMode("uploadKey");
    // setDetectorAr(true)
  };

  const updateContent = (key, value) => {
    let tpContent = cloneDeep(activeOpenSea);
    tpContent[key] = value;
    setActiveOpenSea(tpContent);
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
        setWalletKey(arJson);
        setDetectorAr(true);
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

  useEffect(() => {
    if (detectorAr) {
      window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
      return () => {
        window.removeEventListener(
          "arweaveWalletLoaded",
          detectArweaveWallet()
        );
      };
    }
  }, [detectorAr]);

  const detectArweaveWallet = async () => {
    try {
      let addr = await arweave.wallets.getAddress();
      let addressResult = await getArWalletAddressFromJson(arweave, walletKey);
      console.log("addressResult : ", addressResult);
      console.log("detect address: ", addr);
      if (addr) {
        setAddressAr(addr);
        setMode("uploading");
        // uploading process
        let tpUpdatingProcess = updatingProcess;
        for (let content of uploadContens) {
          try {
            let res = await exportNFT(
              arweave,
              addressAr,
              content,
              content.thumb,
              null,
              walletKey
            );
            console.log(res);
            tpUpdatingProcess++;
            // console.log("test1", JSON.stringify(tpUpdatingProcess))
            // tpUpdatingProcess = tpUpdatingProcess*1 + 1
            // console.log("test2", JSON.stringify(tpUpdatingProcess))
            if (res) {
              console.log("log1" + tpUpdatingProcess);
              setUploadingProcess(tpUpdatingProcess);
            } else {
              console.log("log2" + tpUpdatingProcess);
              setUploadingProcess(tpUpdatingProcess);
              show_notification(
                "There is an error to upload content title '" +
                  content.title +
                  "' "
              );
            }
            if (tpUpdatingProcess + 1 === uploadContens.length) {
              // close modal
              setShowModal(false);
              show_notification("Upload successfully", "KOI", "success");
              // show complete section
              setTimeout(() => {
                setMode("complete");
              }, 2000);
            }
          } catch (err) {
            console.log("error - exportNFT", err);
          }
        }
      } else {
        show_notification(
          "can\t detect ArWallet address. Please check install ArConnect extension or create a wallet."
        );
      }
    } catch (err) {
      console.log(err);
      show_notification(
        "can\t detect ArWallet address. Please install ArConnect extension and create a wallet."
      );
    }
  };

  return (
    <ConfirmOpenseasContainer>
      {mode !== modes.complete && (
        <Progress
          className="d-md-none progress-sm"
          strokeColor={colors.green}
          trailColor={colors.white}
          percent={(activeStep * 100) / uploadContens.length}
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
                        fileList={false}
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
                              You’ll start earning KOI as soon as someone views
                              your content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="upload-content-form d-flex justify-content-center"></div>
                    </Col>
                  </Row>
                  <div className="uploaded-cards-wrapper">
                    {openSeas.length > 0 &&
                      openSeas
                        .filter((_openSea) =>
                          selectedIds.includes(_openSea.id.toString())
                        )
                        .map((_selected, _i) => (
                          <div key={_i} className="uploaded-card">
                            <div className="card-content-wrapper">
                              <Image src={_selected.image_thumbnail_url} />
                              <p className="text-blue">{_selected.name}</p>
                            </div>
                            <div className="uploaded-card-btns d-none d-md-flex">
                              <Button className="btn-blueDark">
                                <Image src={IconShare} width={17} />
                              </Button>
                              <Button className="btn-white btn-html">
                                <Image src={IconHtml} width={17} />
                              </Button>
                            </div>
                            <div className="uploaded-card-btns-sm d-md-none">
                              <Button className="btn-blueDark">
                                <Image
                                  src={IconShare}
                                  className="mr-2"
                                  width={17}
                                />
                                Share
                              </Button>
                              <Button className="btn-white btn-html">
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
                    onClick={() => history.replace("/contents")}
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
                  percent={(activeStep * 100) / uploadContens.length}
                  status="active"
                  showInfo={false}
                />
              )}
            </div>
          </div>
        </div>
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
                {uploadContens.map((c, key) => (
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
                      x {uploadContens.length} uploads
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
                      x {uploadContens.length} uploads
                    </p>
                  </div>
                </div>
                <h6 className="text-blue">
                  <b>Estimated Total</b>
                </h6>
                <h6 className="text-blue">
                  {show_fixed_number(uploadContens.length * 0.0002, 4)} AR
                </h6>
                <h6 className="text-blue">
                  {show_fixed_number(uploadContens.length * 1, 1)} KOI
                </h6>
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
                  percent={(updatingProcess * 100) / uploadContens.length}
                  status="active"
                  showInfo={false}
                />
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </ConfirmOpenseasContainer>
  );
}

export default ConfirmOpenseas;
