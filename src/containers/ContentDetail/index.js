/* eslint-disable react-hooks/exhaustive-deps */
import { IconShare, IconHtml } from "assets/images";
import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { koi_tools } from "koi_tools";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import {
  FaInstagram,
  FaTelegramPlane,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiFacebook,
  FiLinkedin,
  FiMessageCircle,
  FiTwitter,
} from "react-icons/fi";
import { IoLogoTiktok } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { colors } from "theme";
import { ContentDetailContainer } from "./style";
import { DataContext } from "contexts/DataContextContainer";
import { ScaleLoader } from "react-spinners";

const preUrl = "https://arweave.net/";

const contents = [
  {
    balances: { "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU": 1 },
    description:
      "'The Delights of Purim' at the Israeli Opera, photo by Ziv Barak",
    name: "Kayla",
    owner: "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU",
    ticker: "KRK",
    totalReward: 0,
    totalViews: 0,
    twentyFourHrViews: 0,
    txIdContent: "EKW3AApL4mdLc6sIhVr3Cn8VN7N9VAQUp2BNALHXFtQ",
  },
];

const shareSocial = [
  {
    icon: <FiTwitter size={24} color={colors.greenDark} />,
    title: "twitter",
  },
  {
    icon: <FaInstagram size={24} color={colors.greenDark} />,
    title: "instagram",
  },
  {
    icon: <FiFacebook size={24} color={colors.greenDark} />,
    title: "facebook",
  },
  {
    icon: <FiLinkedin size={24} color={colors.greenDark} />,
    title: "linkedin",
  },
  {
    icon: <IoLogoTiktok size={24} color={colors.greenDark} />,
    title: "tiktok",
  },
];
const shareDirect = [
  {
    icon: <FiMessageCircle size={24} color={colors.greenDark} />,
    title: "text",
  },
  {
    icon: <HiOutlineMail size={24} color={colors.greenDark} />,
    title: "email",
  },
  {
    icon: <FaWhatsapp size={24} color={colors.greenDark} />,
    title: "whatsapp",
  },
  {
    icon: <FaTelegramPlane size={24} color={colors.greenDark} />,
    title: "telegram",
  },
];
const ktools = new koi_tools();

function ContentDetail() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { type } = queryString.parse(location.search);
  const { setContents } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const onSwitchModal = () => {
    history.push(
      `/content-detail/${id}?type=${type === "share" ? "embed" : "share"}`
    );
  };

  const getContents = async () => {
    if (contents.length === 0) {
      setIsLoading(true);
      ktools.retrieveTopContent().then((res) => {
        setContents(res);
        setDetail(res.find((_content) => _content.txIdContent === id));
        setIsLoading(false);
        console.log({ res });
      });
    }
  };

  useEffect(() => {
    contents.length > 0 &&
      setDetail(contents.find((_content) => _content.txIdContent === id));
  }, [id]);

  useEffect(() => {
    if (type !== "view") {
      setShowModal(true);
    }
  }, [type]);

  useEffect(() => {
    if (contents.length === 0) {
      getContents();
    }
    if (!showMessage) {
      let timer = setTimeout(() => setShowMessage(true), 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [history.location.pathname]);

  console.log({ detail });
  return (
    <ContentDetailContainer>
      <div className="content-detail-wrapper">
        {isLoading ? (
          <div className="loading-container">
            <ScaleLoader size={15} color={"#2a58ad"} />
          </div>
        ) : (
          <div className="content-detail">
            <div className="detail-header">
              <div
                className="icon-back cursor"
                onClick={() => history.replace("/contents")}
              >
                <i className="fal fa-arrow-circle-left"></i>
              </div>
              <h2 className="text-blue mb-0">{detail.ticker}</h2>
              <Button className="btn-orange ml-auto">Buy It</Button>
              <Button className="btn-green btn-plus">
                <i className="fas fa-plus"></i>
              </Button>
            </div>
            <div className="detail-body">
              <Alert show={showMessage} variant="success">
                <p className="text-blue text-center mb-0">
                  You just voted with your attention! Since you viewed this
                  page, the owner will be rewarded with KOI. <br />
                  <b>Upload something unique to start earning</b>.
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
                      <h1 className="mb-0 text-blue">{detail.ticker}</h1>
                      <p className="detail-username">{detail.name}</p>
                      <p>Registered {detail.created_at || "Jan. 01, 2021"}</p>
                      <p className="mb-0">{detail.description}</p>
                      <p className="see-more">see more</p>
                      <div className="views-wrapper">
                        <div className="view-row">
                          <h5 className="total-value">{detail.totalViews}</h5>
                          <h5 className="total-views">total views</h5>
                        </div>
                        <div className="view-row">
                          <h5 className="total-value">{detail.totalReward}</h5>
                          <h5 className="total-views">total KOI rewards</h5>
                        </div>
                      </div>
                      <div className="btns-wrapper">
                        <Button
                          className="btn-share btn-blueDark"
                          onClick={() =>
                            history.push(`/content-detail/${id}?type=share`)
                          }
                        >
                          <Image src={IconShare} />
                          Share NFT
                        </Button>
                        <Button
                          className="btn-html btn-white ml-3"
                          onClick={() =>
                            history.push(`/content-detail/${id}?type=embed`)
                          }
                        >
                          <Image src={IconHtml} />
                          Embed to Earn
                        </Button>
                      </div>
                      <div className="social-wrapper">
                        <FiTwitter size={24} color={colors.greenDark} />
                        <FaInstagram size={24} color={colors.greenDark} />
                        <FiFacebook size={24} color={colors.greenDark} />
                        <FiMessageCircle size={24} color={colors.greenDark} />
                        <HiOutlineMail size={24} color={colors.greenDark} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-share"
      >
        <Modal.Body>
          <FaTimes
            className="icon-close cursor"
            color={colors.blueDark}
            size={24}
            onClick={() => setShowModal(false)}
          />
          <h2 className="modal-title text-blue">
            {type === "share"
              ? "Share to earn more rewards"
              : "Embed your NFT to earn more."}
          </h2>
          {type === "embed" && (
            <h6 className="modal-description text-blue">
              Every time someone visits a site with your embedded NFTs, you’ll
              earn KOI.
            </h6>
          )}
          {type === "share" ? (
            <div className="content-wrapper content-share">
              <div className="modal-left">
                <Image src={`${preUrl}${detail.txIdContent}`} />
                <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
              </div>
              <div className="modal-right">
                <div className="part">
                  <h6 className="part-title text-blue">Copy the link</h6>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={`${window.location.hostname}${location.pathname}`}
                      placeholder="koi.rocks/genesis_1857746"
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-blueDark" type="button">
                        Copy Link
                      </button>
                    </span>
                  </div>
                </div>
                <div className="part">
                  <h6 className="part-title text-blue">Share on social</h6>
                  <div className="share-social">
                    {shareSocial.map((_social, _i) => (
                      <div key={_i} className="icon-share">
                        {_social.icon}
                        <p className="text-blue">{_social.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="part">
                  <h6 className="part-title text-blue">Share directly</h6>
                  <div className="share-direct">
                    {shareDirect.map((_direct, _i) => (
                      <div key={_i} className="icon-share">
                        {_direct.icon}
                        <p className="text-blue">{_direct.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-wrapper content-embed">
              <div className="modal-left">
                <Image src={`${preUrl}${detail.txIdContent}`} />
                <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
              </div>
              <div className="modal-right">
                <div className="part">
                  <h6 className="part-title text-blue">Copy the snippet</h6>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="<embedding_code_snippet_here>"
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-blueDark" type="button">
                        Copy Code
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {type === "share" ? (
            <p className="text-blue footer-title">
              or <b onClick={onSwitchModal}>embed it</b> on a website
            </p>
          ) : (
            <p className="text-blue footer-title">
              or <b onClick={onSwitchModal}>share it</b> with friends
            </p>
          )}
        </Modal.Body>
      </Modal>
      {/* <Modal
        show={showModalEmbed}
        onHide={() => setShowModalEmbed(false)}
        dialogClassName="modal-embed"
      >
        <Modal.Body>
          <FaTimes
            className="icon-close cursor"
            color={colors.blueDark}
            size={24}
            onClick={() => setShowModalShare(false)}
          />
          <h2 className="modal-title text-blue">
            Embed your NFT to earn more.
          </h2>
          <h6 className="modal-description text-blue">
            Every time someone visits a site with your embedded NFTs, you’ll
            earn KOI.
          </h6>
          <div className="content-wrapper">
            <div className="modal-left">
              <Image src={ItemTemp} width={136} />
              <h6 className="text-blue mb-0 text-bold">Genesis</h6>
            </div>
            <div className="modal-right">
              <div className="part">
                <h6 className="part-title text-blue">Copy the link</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-blueDark" type="button">
                      Copy Link
                    </button>
                  </span>
                </div>
              </div>
              <div className="part">
                <h6 className="part-title text-blue">Share on social</h6>
                <div className="share-social">
                  {shareSocial.map((_social, _i) => (
                    <div key={_i} className="icon-share">
                      {_social.icon}
                      <p className="text-blue">{_social.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="part">
                <h6 className="part-title text-blue">Share directly</h6>
                <div className="share-direct">
                  {shareDirect.map((_direct, _i) => (
                    <div key={_i} className="icon-share">
                      {_direct.icon}
                      <p className="text-blue">{_direct.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-blue footer-title">
                or <b onClick={onSwitchToEmbed}>embed it</b> on a website
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </ContentDetailContainer>
  );
}

export default ContentDetail;
