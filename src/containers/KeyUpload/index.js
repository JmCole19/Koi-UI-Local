/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { IconUpload } from "assets/images";
import { KeyUploadContainer } from "./style";
import { Col, Form, Input, Row, Upload, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import cloneDeep from "clone-deep";
import { useHistory, useLocation } from "react-router-dom";
import MyProgress from "components/Elements/MyProgress";
import ArconnectCard from "components/Elements/ArconnectCard";
import { show_notification } from "service/utils";
import Arweave from "arweave";
import { getArWalletAddressFromJson, exportNFT } from "service/NFT";
import { colors } from "theme";
import { FaArrowLeft } from "react-icons/fa";

const { Dragger } = Upload;

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    // wrapperCol: {
    //   span: 14,
    // },
};

function KeyUpload() {
    const history = useHistory();
    const [form] = useForm();
    const [uploading] = useState(false);
    const [imageBlob, setImageBlob] = useState(null);
    const [activeContent, setActiveContent] = useState({
        title: "",
        owner: "",
        description: "",
    });

    const onCompleteStep3 = () => {
        console.log("Completed");
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
                try {
                    let res = await exportNFT(
                        arweave,
                        addressResult,
                        activeContent,
                        "",
                        imageBlob,
                        arJson
                    );
                    if (res) {
                        show_notification(
                            "Your transaction id is " + res + ". Upload successfully",
                            "NFT uploading",
                            "success"
                        );
                        setTimeout(() => {
                            history.push("/contents");
                        }, 3000);
                    } else {
                        show_notification("Something error", "NFT uploading");
                    }
                } catch (err) {
                    console.log("here1");
                    console.log(err);
                    show_notification("Something error", "NFT uploading");
                }
                // exportNFT(addressResult, 0.0001, '', imageBlob)
                // .then(res => console.log("success", res))
                // .catch(err => console.log("error", err))
                // .finally( () => show_notification('upload successfully', 'KOI', 'success'))
            };
            reader.readAsText(file);
            // Prevent upload
            return false;
        }
        return isJson && isLt1M;
    };

    const onOpenArConnect = () => {
        show_notification("ArConnection will be integrated soon", "KOI", "error");
    };

    return (
        <KeyUploadContainer>
            <Container>
                <div className="upload-content-wrapper">
                    <div className="upload-content">
                        <div className="title-wrapper">
                            <h1 className="text-blue upload-title">Upload Arweave Wallet Key.</h1>
                        </div>
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
                                        </div>
                                        <div className="upload-content-form d-flex justify-content-center"></div>
                                    </Col>
                                </Row>
                                <div className="upload-cards-wrapper">
                                    <div className="single-ant-file-upload">
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
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </KeyUploadContainer>
    );
}

export default KeyUpload;
