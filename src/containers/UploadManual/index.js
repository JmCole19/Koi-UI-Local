/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "react-bootstrap";
import queryString from "query-string";
import { IconUpload, IconArConnect } from "assets/images";
import { UploadUploadContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useHistory, useLocation } from "react-router-dom";
import MyProgress from "components/Elements/MyProgress";
import { show_notification } from 'service/utils'

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
  const [uploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [activeContent, setActiveContent] = useState({});

  const onCompleteStep1 = () => {
    history.push(`/upload/manual?step=2`);
  };

  const onCompleteStep2 = () => {
    history.push(`/upload/manual?step=3`);
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  const beforeUpload = (file) => {
    // let fileExt = file.name.split('.')
    // fileExt = fileExt[fileExt.length - 1]
    console.log('file type : ', file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      show_notification('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      show_notification('Image must smaller than 10MB!');
    }
    if(isJpgOrPng && isLt2M) {
      console.log("here1")
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result)
        setImageUrl(e.target.result)
      }
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
  }

  useEffect(() => {
    if(step !== '1' && !imageUrl) {
      history.replace(`/upload/manual?step=1`);
    }
  }, [])

  return (
    <UploadUploadContainer>
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
                      </div>
                      <div className="upload-image-form">
                        <div className="upload-content-row">
                          <div className="single-ant-file-upload">
                            <Dragger
                              name="file"
                              accept="video/*, image/*"
                              multiple={false}
                              listType="picture"
                              beforeUpload={beforeUpload}
                              fileList={false}
                              showUploadList={false}
                            >
                              {uploading ? (
                                <Spin size="large" />
                              ) : (
                                <>
                                  <div className="uploader-container">
                                    <div className="uploader-icon d-flex justify-content-center align-items-center">
                                      <Image src={IconUpload} />
                                    </div>
                                    <p className="text-blue mb-0">
                                      Drag & Drop or click to browse your computer.
                                    </p>
                                  </div>
                                </>)}
                            </Dragger>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="submit" disabled={!imageUrl} className="btn-blueDark mx-auto px-5">
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
                      </div>
                      <div className="upload-content-form">
                        <div className="content-img-wrapper">
                          <Image src={imageUrl} className="w100" />
                        </div>
                        <div className="upload-content-row">
                          <Form.Item>
                            <div className="left">
                              <p className="mb-0">Title</p>
                            </div>
                            <Input
                              value={activeContent?.name}
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
                              value={activeContent?.owner?.user?.username}
                            />
                          </Form.Item>
                          <Form.Item>
                            <div className="left">
                              <p className="mb-0">Description</p>
                            </div>
                            <TextArea
                              placeholder="input placeholder"
                              value={activeContent?.description}
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
                              Add Details
                            </Button>
                            <Button className="btn-white btn-edit ml-3">
                              Add Later
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
                                Drag & Drop your Ethereum keyfile here.
                              </p>
                            </>
                          )}
                        </div>
                      </Dragger>
                      {/* {src.length > 0 && <p>{src[0].originalname.split('.')[1]}</p>} */}
                      {/* <p className="text-secondary">dddddd</p> */}
                    </div>
                    <div className="arConnect-card">
                      <div className='card-icon'>
                        <Image src={IconArConnect} />
                      </div>
                      <p className="text-blue text-center mb-0">Click here to open ArConnect browser extension. </p>
                    </div>
                  </div>
                </Form>
                <p className='footer-description text-blue'>Don’t have any Arweave (AR) tokens? Visit the <a href="#/">Arweave Faucet</a> to get started.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </UploadUploadContainer>
  );
}

export default UploadManual;
