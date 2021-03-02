/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { IconArweave, IconEthereum, IconUpload } from "assets/images";
import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RegisterContentContainer } from "./style";

const cards = [
  {
    img: IconArweave,
    title: "Arweave Content",
    subtitle: "Enter an Arweave ID",
    type: 'arweave'
  },
  {
    img: IconEthereum,
    title: "Ethereum NFT ",
    subtitle: "Enter a Token ID",
    type: 'ethereum'
  },
  {
    img: IconUpload,
    title: "Upload Manually",
    subtitle: "Drag & Drop or Click to Browse",
    type: 'manual'
  },
];

function RegisterContent() {

  const history = useHistory();

  return (
    <RegisterContentContainer>
      <Container>
        <div className="register-content-wrapper">
          <div className="register-content">
            <h1 className="text-blue register-title">Register your content.</h1>
            <h4 className="register-description">
              There are 3 ways to register on the Koi Network. Earn rewards
              today.
            </h4>
            <Row align="middle">
              {cards.map((_card, _i) => (
                <Col
                  key={_i}
                  className="register-card-wrapper"
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                >
                  <div className="register-card" onClick={() => history.push(`/upload/${_card.type}?step=1`)}>
                    <Image src={_card.img} />
                    <h5>{_card.title}</h5>
                    <p className="mb-0">{_card.subtitle}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="btn-back-wrapper">
              <Button className="btn-back btn-blueDark" onClick={() => history.push('/leaderboard')}>
                Back to Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </RegisterContentContainer>
  );
}

export default RegisterContent;
