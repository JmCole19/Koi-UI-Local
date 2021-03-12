/* eslint-disable react-hooks/exhaustive-deps */
import { ItemTempModal, IconShare, IconHtml, ItemTemp } from "assets/images";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
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
function ContentDetail() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { type } = queryString.parse(location.search);
  const [detail, setDetail] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalEmbed, setShowModalEmbed] = useState(false);

  const onSwitchToEmbed = () => {
    
  }
  useEffect(() => {
    showModalShare && setShowModalShare(false);
    showModalEmbed && setShowModalEmbed(false);
    if (type === "share") {
      setShowModalShare(true);
    } else if (type === "embed") {
      setShowModalEmbed(true);
    }
  }, [type]);

  useEffect(() => {
    setDetail(contents.find((_content) => _content.txIdContent === id));
  }, [id]);

  useEffect(() => {
    if (!showMessage) {
      let timer = setTimeout(() => setShowMessage(true), 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [history.location.pathname]);

  return (
    <ContentDetailContainer>
      <div className="content-detail-wrapper">
        <div className="content-detail">
          <div className="detail-header">
            <div className="icon-back cursor" onClick={() => history.goBack()}>
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
                You just voted with your attention! Since you viewed this page,
                the owner will be rewarded with KOI. <br />
                <b>Upload something unique to start earning</b>.
              </p>
            </Alert>
            <Container>
              <Row>
                <Col className="col-md-6">
                  <Image src={ItemTempModal} width={480} />
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
                      <Button className="btn-share btn-blueDark">
                        <Image src={IconShare} />
                        Share NFT
                      </Button>
                      <Button className="btn-html btn-white ml-3">
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
      </div>
      <Modal
        show={showModalShare}
        onHide={() => setShowModalShare(false)}
        dialogClassName="modal-share"
      >
        <Modal.Body>
          <FaTimes
            className="icon-close cursor"
            color={colors.blueDark}
            size={24}
            onClick={() => setShowModalShare(false)}
          />
          <h2 className="modal-title text-blue">Share to earn more rewards</h2>
          <div className="content-wrapper">
            <div className="modal-left">
              <Image src={ItemTemp} width={136} />
              <h6 className="text-blue mb-0">Genesis</h6>
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
      </Modal>
      <Modal
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
        </Modal.Body>
      </Modal>
    </ContentDetailContainer>
  );
}

export default ContentDetail;
