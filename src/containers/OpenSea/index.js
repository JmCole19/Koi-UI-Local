/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { ItemTemp } from "assets/images";
import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OpenSeaContainer } from "./style";

const cards = [
  {
    img: ItemTemp,
    title: "Genesis",
  },
  {
    img: ItemTemp,
    title: "Mercury (The Planets #1)",
  },
  {
    img: ItemTemp,
    title: "Vitalik Buterin Gold Edition 1/100",
  },
  {
    img: ItemTemp,
    title: "Astrid’s cute little face",
  },
  {
    img: ItemTemp,
    title: "The Balance of Koi",
  },
  {
    img: ItemTemp,
    title: "Astropinx",
  },
  {
    img: ItemTemp,
    title: "Prosperity | Crypto Cookies #5 ",
  },
  {
    img: ItemTemp,
    title: "Non-fungible FUNGI_ 008",
  },
];

function OpenSea() {
  const onClickCard = () => {};
  return (
    <OpenSeaContainer>
      <Container>
        <div className="opensea-content-wrapper">
          <div className="opensea-content">
            <h1 className="text-blue opensea-title">Your OpenSea content</h1>
            <h4 className="opensea-description">
              Select your NFTs to upload them to Arweave’s permaweb. You’ll earn
              rewards every time someone views them!
            </h4>
            <Row
              // gutter={{ xs: [8, 8], sm: [16, 16], md: [24, 24], lg: [32, 32] }}
              gutter={[
                { sm: 16, lg: 32 },
                { sm: 16, lg: 32 },
              ]}
              className="opensea-cards"
            >
              {cards.map((_card, _i) => (
                <Col
                  key={_i}
                  className="gutter-row"
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                >
                  <div className={`opensea-card`} onClick={onClickCard}>
                    <div className="card-img">
                      <Image src={_card.img} />
                    </div>
                    <div className="card-content">
                      <h5>{_card.title}</h5>
                      <p className="mb-1">{_card.subtitle1}</p>
                      {_card.subtitle2 && (
                        <p className="mb-0">{_card.subtitle2}</p>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="btn-back-wrapper">
              <Button className="btn-back btn-blueDark">Verify Details</Button>
            </div>
            <p className="bottom-description text-blue text-center">
              Got a voucher? <Link to="#/">Redeem an NFT voucher</Link> from
              Ethereum to claim your Atomic NFT.
            </p>
          </div>
        </div>
      </Container>
    </OpenSeaContainer>
  );
}

export default OpenSea;
