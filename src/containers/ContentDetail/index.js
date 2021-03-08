/* eslint-disable react-hooks/exhaustive-deps */
import { ItemTempModal, IconShare, IconHtml } from "assets/images";
import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiMessageCircle, FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { colors } from "theme";
import { ContentDetailContainer } from "./style";

function ContentDetail() {
  return (
    <ContentDetailContainer>
      <div className="content-detail-wrapper">
        <div className="content-detail">
          <div className="detail-header">
            <div className="icon-back">
              <i className="fal fa-arrow-circle-left"></i>
            </div>
            <h2 className="text-blue">Genesis</h2>
            <Button className="btn-orange ml-auto">Buy It</Button>
            <Button className="btn-green">
              <i className="fas fa-plus"></i>
            </Button>
          </div>
          <Container className="detail-body">
            <Row>
              <Col className="col-md-6">
                <Image src={ItemTempModal} width={480} />
              </Col>
              <Col className="col-md-6">
                <div className="detail-body-description">
                  <h1>Genesis</h1>
                  <p>Maxstealth</p>
                  <p>Registered Jan. 01, 2021</p>
                  <p>
                    José Delbo sent me his striking pencil sketch and powerful
                    inked work, which I then interpreted in oil on canvas. I
                    wanted to create a very painterly piece with obvious brush
                    marks etc, but I was also aiming for a nostalgic feel, a
                    kind of 1980’s superhero comic book look, the kind I grew up
                    with.
                  </p>
                  <p className="see-more">see more</p>
                  <div className="views-wrapper">
                    <div className="view-row">
                      <h5>795,267</h5>
                      <h5 className="total-views">total views</h5>
                    </div>
                    <div className="view-row">
                      <h5>795,267</h5>
                      <h5 className="total-views">total views</h5>
                    </div>
                  </div>
                  <div className="btns-wrapper">
                    <Button className="btn-share btn-blueDark">
                      <Image src={IconShare} />
                      Share NFT
                    </Button>
                    <Button className="btn-html btn-white">
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
    </ContentDetailContainer>
  );
}

export default ContentDetail;
