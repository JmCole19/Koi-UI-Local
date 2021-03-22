/* eslint-disable react-hooks/exhaustive-deps */
import { IconShare, IconHtml } from "assets/images";
import React, { useContext, useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  EmailShareButton,
} from "react-share";
// import { koi_tools } from "koi_tools";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiMessageCircle, FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory, useParams } from "react-router-dom";
import { colors } from "theme";
import { ContentDetailContainer } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { ScaleLoader } from "react-spinners";
import ModalContent from "components/Elements/ModalContent";
import { show_notification } from "service/utils";
import axios from "axios";
import AlertArea from "components/Sections/AlertArea";
import { preUrl } from "config"

// const ktools = new koi_tools();

function ContentDetail() {
  const history = useHistory();
  const { id } = useParams();
  const currentUrl = `${window.location.hostname}${history.location.pathname}`;
  const { contents, setContents } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [showAlert, setShowAlert] = useState(false);
  const [errEmessage, setErrMessage] = useState('');

  const onSwitchModal = () => {
    setModalType(modalType === "share" ? "embed" : "share");
  };

  const getContents = async () => {
    // setContents(temp_contents)
    if (contents.length === 0) {
      setIsLoading(true);
      axios.get('https://bundler.openkoi.com/state/getTopContent/')
      .then((res) => {
        const data = res.data
        // console.log({ data });
        if(data === 0) {
          show_alert("There is no contents.")  
        }else{
          setContents(data);
          const item = data.find((_content) => _content.txIdContent === id)
          if(item) {
            console.log(item)
            setDetail(item);
          }else{
            show_notification("There is no matching contents.")  
          }
        }
      }).catch( err => {
        console.log(err)
        show_alert('There is an error')
      }).finally( () => setIsLoading(false));
      // ktools.retrieveTopContent().then((res) => {
      //   setContents(res);
      //   setDetail(res.find((_content) => _content.txIdContent === id));
      //   setIsLoading(false);
      //   console.log({ res });
      // });
    }
  };

  const show_alert = (message = '') => {
    setShowAlert(true)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, 4000)
  }

  const onClickShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickBuyIt = (contract_ID) => {
    let url = "https://space.verto.exchange/asset/" + contract_ID;
    window.open(url, "_blank");
  }
  useEffect(() => {
    console.log(contents)
    if( contents.length > 0 ){
      const findContent = contents.find((_content) => _content.txIdContent === id)
      if(findContent) {
        console.log(findContent)
        setDetail(findContent);
      }
    }
  }, [id]);

  useEffect(() => {
    if (contents.length === 0) {
      getContents();
    }
    if (!localStorage.getItem("visited")) {
      let timer = setTimeout(() => {
        setShowMessage(true);
        localStorage.setItem("visited", 'yes')
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [history.location.pathname]);

  console.log({ detail });
  return (
    <>
      <AlertArea
        showMessage={showAlert}
        message={errEmessage}
      ></AlertArea>
      <ContentDetailContainer>
        <div className="content-detail-wrapper text-center">
          {isLoading && (
            <div className="loading-container">
              <ScaleLoader size={15} color={"#2a58ad"} />
            </div>
          )}
          { (!isLoading && detail) ? (
            <div className="content-detail">
              <div className="detail-header">
                <div
                  className="icon-back cursor"
                  onClick={() => history.replace("/contents")}
                >
                  <i className="fal fa-arrow-circle-left"></i>
                </div>
                <h2 className="text-blue mb-0">{detail.ticker}</h2>
                <Button onClick={() => onClickBuyIt(detail.txIdContent)} className="btn-orange ml-auto">Buy It</Button>
                <Button
                  className="btn-green btn-plus"
                  onClick={() => history.push("/register-content")}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
              <div className="detail-body">
                <Alert show={showMessage} variant="success">
                  <p className="text-blue text-center mb-0">
                    You just voted with your attention! Since you viewed this
                    page, the owner will be rewarded with KOI. <br />
                    <b
                      className="cursor"
                      onClick={() => history.push("/register-content")}
                    >
                      Upload something unique to start earning
                    </b>
                    .
                  </p>
                </Alert>
                <Container>
                  <Row>
                    <Col className="col-md-6">
                      <Image
                        src={`${preUrl}${detail.txIdContent}`}
                        className="detail-img"
                      />
                    </Col>
                    <Col className="col-md-6">
                      <div className="detail-body-description">
                        <h1 className="mb-0 text-blue text-left">{detail.ticker}</h1>
                        <p className="detail-username">{detail.name}</p>
                        <p className="text-left">Registered {detail.created_at || "Jan. 01, 2021"}</p>
                        {/* <p className="mb-0">{detail.description}</p> */}
                        {isExpanded || detail.description?.length < 300 ? (
                          <p className="mb-0 text-left">{detail.description}</p>
                        ) : (
                          <p className="mb-0 text-left">
                            {detail.description &&
                              detail.description.substr(0, 300) + "..."}
                          </p>
                        )}
                        {detail.description && detail.description.length > 300 && (
                          <div className="btn-show-more-wrapper">
                            <p
                              className="see-more cursor"
                              onClick={onClickShowMore}
                            >
                              {isExpanded ? "see less" : "see more"}
                            </p>
                          </div>
                        )}
                        <div className="views-wrapper">
                          <div className="view-row">
                            <h5 className="total-value text-left">{detail.totalViews}</h5>
                            <h5 className="total-views">total views</h5>
                          </div>
                          <div className="view-row">
                            <h5 className="total-value text-left">{detail.totalReward}</h5>
                            <h5 className="total-views">total KOI rewards</h5>
                          </div>
                        </div>
                        <div className="btns-wrapper">
                          <Button
                            className="btn-share btn-blueDark"
                            onClick={() => {
                              setModalType("share");
                              setShowModal(true);
                            }}
                          >
                            <Image src={IconShare} />
                            Share NFT
                          </Button>
                          <Button
                            className="btn-html btn-white ml-3"
                            onClick={() => {
                              setModalType("embed");
                              setShowModal(true);
                            }}
                          >
                            <Image src={IconHtml} />
                            Embed to Earn
                          </Button>
                        </div>
                        <div className="social-wrapper">
                          <TwitterShareButton url={currentUrl}>
                            <FiTwitter size={24} color={colors.greenDark} />
                          </TwitterShareButton>
                          <InstapaperShareButton url={currentUrl}>
                            <FaInstagram size={24} color={colors.greenDark} />
                          </InstapaperShareButton>
                          <FacebookShareButton url={currentUrl}>
                            <FiFacebook size={24} color={colors.greenDark} />
                          </FacebookShareButton>
                          <FiMessageCircle size={24} color={colors.greenDark} />
                          <EmailShareButton url={currentUrl}>
                            <HiOutlineMail size={24} color={colors.greenDark} />
                          </EmailShareButton>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          ) : <h4 className="text-center mt-4">'There is no content'</h4>} 
        </div>
        {detail && <ModalContent
          type={modalType}
          show={showModal}
          detail={detail}
          onHide={() => setShowModal(false)}
          onSwitchModal={onSwitchModal}
        />}
      </ContentDetailContainer>
    </>
  );
}

export default ContentDetail;
