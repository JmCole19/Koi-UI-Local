/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { IconArweave, IconEthereum, IconUpload } from "assets/images";
import { CheckoutContainer } from "./style";
import { Col, Form, Row, Upload, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useParams } from "react-router-dom";
import MetaWrapper from "components/Wrappers/MetaWrapper";

const { Dragger } = Upload;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 14,
  // },
};

function Checkout() {
  const [form] = useForm();
  const { type } = useParams();
  const [uploading] = useState(false);

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  return (
    <MetaWrapper>
      <CheckoutContainer>
        <Container>
          <div className="upload-content-wrapper">
            <div className="upload-content">
              <h1 className="upload-title text-blue">Check out your content.</h1>
              <h4 className='text-blue w-100 text-left'>
                See all the content you’ve registered on Koi— and the rewards
                you’ve earned so far!
              </h4>
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
                          src={type === "ethereum" ? IconEthereum : IconArweave}
                        />
                      </div>
                    </Col>
                    <Col flex={1}>
                      <div className="upload-header">
                        <div className="upload-header-title">
                          <div className="header-description w-100">
                            <h6 className="mb-0 text-blue ml-2">
                              Upload your Arweave keyfile.
                            </h6>
                            <p className="mb-0 text-blue ml-2">
                              Don’t have one yet? Visit the{" "}
                              <a href="#/" className="text-green">
                                Arweave Faucet
                              </a>{" "}
                              to get started and upload your first NFT.
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
            </div>
          </div>
        </Container>
      </CheckoutContainer>
    </MetaWrapper>
  );
}

export default Checkout;
