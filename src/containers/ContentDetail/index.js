/* eslint-disable react-hooks/exhaustive-deps */
import { ItemTempModal, IconShare, IconHtml } from "assets/images";
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
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiMessageCircle, FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useHistory, useLocation } from "react-router-dom";
import { colors } from "theme";
import { ContentDetailContainer } from "./style";

function ContentDetail() {
  const history = useHistory();
  const location = useLocation();
  const { type } = queryString.parse(location.search);
  const [showMessage, setShowMessage] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalEmbed, setShowModalEmbed] = useState(false);

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
            <h2 className="text-blue mb-0">Genesis</h2>
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
                    <h1 className="mb-0 text-blue">Genesis</h1>
                    <p className="detail-username">Maxstealth</p>
                    <p>Registered Jan. 01, 2021</p>
                    <p className="mb-0">
                      José Delbo sent me his striking pencil sketch and powerful
                      inked work, which I then interpreted in oil on canvas. I
                      wanted to create a very painterly piece with obvious brush
                      marks etc, but I was also aiming for a nostalgic feel, a
                      kind of 1980’s superhero comic book look, the kind I grew
                      up with.
                    </p>
                    <p className="see-more">see more</p>
                    <div className="views-wrapper">
                      <div className="view-row">
                        <h5 className="total-value">795,267</h5>
                        <h5 className="total-views">total views</h5>
                      </div>
                      <div className="view-row">
                        <h5 className="total-value">2,106.58</h5>
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
        dialogClassName="item-modal"
      >
        <Modal.Body>Modal Share</Modal.Body>
      </Modal>
      <Modal
        show={showModalEmbed}
        onHide={() => setShowModalEmbed(false)}
        dialogClassName="item-modal"
      >
        <Modal.Body>Modal Embed</Modal.Body>
      </Modal>
    </ContentDetailContainer>
  );
}

export default ContentDetail;
