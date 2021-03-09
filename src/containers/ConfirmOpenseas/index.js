/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import queryString from "query-string";
import {
  IconArConnect,
  IconHtml,
  IconOpenSea,
  IconShare,
  IconUpload,
} from "assets/images";
import { ConfirmOpenseasContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin, Progress } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useHistory, useLocation } from "react-router-dom";
import { colors } from "theme";
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

function ConfirmOpenseas() {
  const history = useHistory();
  const { openSeas, setOpenSeas } = useContext(DataContext);
  const [form] = useForm();
  const location = useLocation();
  const { step = "1", selected, address } = queryString.parse(location.search);
  const [uploading] = useState(false);
  const [activeOpenSea, setActiveOpenSea] = useState({});
  const selectedIds = selected.split("_");
  console.log({ selectedIds });

  const onClickConfirm = () => {
    // if (parseInt(step) > selectedIds.length) {
    // } else {
    history.push(
      `/confirm-opensea?address=${address}&step=${
        parseInt(step) + 1
      }&selected=${selected}`
    );
    // }
  };

  const onCompleteStep3 = () => {
    console.log("Completed");
  };

  console.log({ activeOpenSea });
  useEffect(() => {
    setActiveOpenSea(
      openSeas.find(
        (_openSea) => selectedIds[parseInt(step) - 1] == _openSea.id
      )
    );
  }, [step, openSeas]);

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
    <ConfirmOpenseasContainer>
      <Container>
        <div className="upload-content-wrapper">
          <div className="upload-content">
            <h1 className="upload-title text-blue">Register your content.</h1>
            <div className="upload-wrapper">
              <div
                className="icon-back cursor"
                onClick={() => history.goBack()}
              >
                <i className="fal fa-arrow-circle-left"></i>
              </div>
              {parseInt(step) <= selectedIds.length ? (
                <Form
                  layout="horizontal"
                  form={form}
                  {...formItemLayout}
                  onFinish={onClickConfirm}
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
                          <h6 className="mb-0 text-blue ml-2">
                            Confirm the information for your upload.
                          </h6>
                        </div>
                      </div>
                      <div className="upload-content-form">
                        <div className="content-img-wrapper">
                          <Image src={activeOpenSea?.image_thumbnail_url} />
                        </div>
                        <div className="upload-content-row">
                          <Form.Item>
                            <div className="left">
                              <p className="mb-0">Title</p>
                            </div>
                            <Input
                              value={activeOpenSea?.name}
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
                              value={activeOpenSea?.owner?.user?.username}
                            />
                          </Form.Item>
                          <Form.Item>
                            <div className="left">
                              <p className="mb-0">Description</p>
                            </div>
                            <TextArea
                              placeholder="input placeholder"
                              value={activeOpenSea?.description}
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
                              Confirm NFT Details
                            </Button>
                            <Button className="btn-white btn-edit ml-3">
                              Edit Later
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              ) : parseInt(step) == selectedIds.length + 1 ? (
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
              ) : (
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
                            <Image src={_selected.image_thumbnail_url} />
                            <p className="text-blue">{_selected.name}</p>
                            <div className="uploaded-card-btns">
                              <Button className="btn-blueDark">
                                <Image src={IconShare} width={17} />
                              </Button>
                              <Button className="btn-white btn-html">
                                <Image src={IconHtml} width={17} />
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
                </Form>
              )}
              {parseInt(step) <= selectedIds.length && (
                <Progress
                  strokeColor={colors.blueDark}
                  trailColor={colors.blueLight}
                  percent={(parseInt(step) * 100) / selectedIds.length}
                  status="active"
                  showInfo={false}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </ConfirmOpenseasContainer>
  );
}

export default ConfirmOpenseas;
