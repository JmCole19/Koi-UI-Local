/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
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

function UploadArweave() {
  const history = useHistory();
  const [form] = useForm();
  const location = useLocation();
  const { step } = queryString.parse(location.search);
  const {setAddressArweave} = useContext(DataContext);
  const [uploading] = useState(false);

  const onCompleteStep1 = () => {
    history.push(`/upload/arweave?step=2`);
  };

  const onCompleteStep2 = () => {
    history.push(`/upload/arweave?step=3`);
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const beforeUpload = file => {
    if (file.type !== 'application/json') {
      notification.warn({
        message: "Warning!",
        description: `${file.name} is not a json file`,
        placement: "bottomRight",
      });
      return false;
    } else {
      const reader = new FileReader();
      // reader.readAsDataURL(file);
      reader.readAsText(file)
      reader.onload = async(e) => {
        const arweave = Arweave.init({
          host: "arweave.net",
          port: 443,
          protocol: "https",
        });
        let addressResult = await arweave.wallets.jwkToAddress(JSON.parse(e.target.result));
        setAddressArweave(addressResult)
        notification.success({
          message: "Success!",
          description: `Set address successfully.`,
          placement: "bottomRight",
          onClose: () => history.push(`/contents`)
        });
      }
      return false;
    }
  }

  return (
    <UploadArweaveContainer>
      <Container>
        <div className="upload-content-wrapper">
          <div className="upload-content">
            <h1 className="upload-title text-blue">Register your content.</h1>
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
                        <Image
                          src={IconArweave}
                        />
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
                              placeholder="input placeholder"
                              className="arweave-value-input"
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
                        <Image
                          src={IconArweave}
                        />
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
                        <Image
                          src={IconArweave}
                        />
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
  );
}

export default UploadArweave;