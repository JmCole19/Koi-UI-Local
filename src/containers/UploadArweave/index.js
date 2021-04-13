/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Container, Image, Button } from "react-bootstrap";
import queryString from "query-string";
import Arweave from "arweave";
import { IconArweave, IconUpload } from "assets/images";
import { UploadArweaveContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useHistory, useLocation } from "react-router-dom";
import MyProgress from "components/Elements/MyProgress";
import { DataContext } from "contexts/DataContextContainer";
import { FaArrowLeft } from "react-icons/fa";
import { colors } from "theme";
import { get_arweave_option } from "service/utils";
import MetaWrapper from "components/Wrappers/MetaWrapper";

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
  const { setAddressAr } = useContext(DataContext);
  const [uploading] = useState(false);
  const [arToken, setArToken] = useState('');

  const onCompleteStep1 = () => {
    history.push(`/upload/arweave?step=2&address=${arToken}`);
  };

  const onCompleteStep2 = () => {
    history.push(`/upload/arweave?step=3`);
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const beforeUpload = (file) => {
    if (file.type !== "application/json") {
      notification.warn({
        message: "Warning!",
        description: `${file.name} is not a json file`,
        placement: "bottomRight",
      });
      return false;
    } else {
      const reader = new FileReader();
      // reader.readAsDataURL(file);
      reader.readAsText(file);
      reader.onload = async (e) => {
        let addressResult = await arweave.wallets.jwkToAddress(
          JSON.parse(e.target.result)
        );
        setAddressAr(addressResult);
        notification.success({
          message: "Success!",
          description: `Set address successfully.`,
          placement: "bottomRight",
          onClose: () => history.push(`/contents`),
        });
      };
      return false;
    }
  };

  useEffect(() => {
    if (address) {
      setIsLoading(true);
      const options = {
        method: "GET",
      };

      axios
        .get("https://viewblock.io/arweave/tx/" + address)
        .then((res) => {
          const data = res.data;
          console.log({ data });
          if (data === 0) {
            show_alert("There is no contents.");
          } else {
            // setContents(data);
            // const item = data.find((_content) => _content.txIdContent === id);
            // if (item) {
            //   console.log(item);
            //   setDetail(item);
            // } else {
            //   show_notification("There is no matching contents.");
            // }
          }
        })
        .catch((err) => {
          console.log(err);
          show_alert("There is an error");
        })
        .finally(() => setIsLoading(false));
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (step !== "1" && !address) {
      history.replace(`/upload/arweave?step=1`);
    }
  }, []);

  return (
    <MetaWrapper>
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
                            <Form.Item label="Token ID:">
                              <Input
                                placeholder="input placeholder"
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
                              Confirm your data.
                            </h6>
                          </div>
                        </div>
                        <div className="upload-content-form">
                          <div className="upload-content-row">
                            <Form.Item label="Title">
                              <Input
                                placeholder="input placeholder"
                                className="arweave-value-input"
                              />
                            </Form.Item>
                            <Form.Item label="Owner">
                              <Input
                                placeholder="input placeholder"
                                className="arweave-value-input"
                              />
                            </Form.Item>
                            <Form.Item label="Description">
                              <TextArea
                                placeholder="input placeholder"
                                className="arweave-value-input"
                                rows={5}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button type="submit" className="btn-blueDark mx-auto px-5">
                        Confirm NFT Details
                      </Button>
                    </Form.Item>
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
                                Upload your Arweave keyfile.
                              </h6>
                              <p className="mb-0 text-blue ml-2">
                                Don’t have one yet? Visit the{" "}
                                <a href="#/" className="text-green">
                                  Arweave Faucet
                                </a>
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="upload-content-form d-flex justify-content-center"></div>
                      </Col>
                    </Row>
                    <div className="single-ant-file-upload">
                      <Dragger
                        name="file"
                        multiple={false}
                        listType={false}
                        // previewFile={false}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
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
                      {/* {src.length > 0 && <p>{src[0].originalname.split('.')[1]}</p>} */}
                      {/* <p className="text-secondary">dddddd</p> */}
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </Container>
      </UploadArweaveContainer>
    </MetaWrapper>
  );
}

export default UploadArweave;
