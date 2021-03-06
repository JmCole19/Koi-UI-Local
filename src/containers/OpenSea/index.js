/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { ItemTemp } from "assets/images";
import React, { useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { FaCheck, FaPlus } from "react-icons/fa";
import { OpenSeaContainer } from "./style";

const cards = [
  {
    id: "1",
    img: ItemTemp,
    title: "Genesis",
  },
  {
    id: "2",
    img: ItemTemp,
    title: "Mercury (The Planets #1)",
  },
  {
    id: "3",
    img: ItemTemp,
    title: "Vitalik Buterin Gold Edition 1/100",
  },
  {
    id: "4",
    img: ItemTemp,
    title: "Astrid’s cute little face",
  },
  {
    id: "5",
    img: ItemTemp,
    title: "The Balance of Koi",
  },
  {
    id: "6",
    img: ItemTemp,
    title: "Astropinx",
  },
  {
    id: "7",
    img: ItemTemp,
    title: "Prosperity | Crypto Cookies #5 ",
  },
  {
    id: "8",
    img: ItemTemp,
    title: "Non-fungible FUNGI_ 008",
  },
];

function OpenSea() {
  const [selectedIds, setSelectedIds] = useState(["1", "4"]);

  const onClickCard = (cardId) => {
    let tempSelectedCards = [...selectedIds];
    if (tempSelectedCards.includes(cardId)) {
      setSelectedIds(tempSelectedCards.filter((_cardId) => _cardId !== cardId));
    } else {
      setSelectedIds([...tempSelectedCards, cardId]);
    }
  };

  const onSelectAll = () => {
    setSelectedIds(cards.map((_card) => _card.id));
  };
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
            <div className="counts-wrapper">
              <div className="selected-counts">{selectedIds.length}</div>
              <Button className="btn-all" onClick={onSelectAll}>
                Select all NFTs
              </Button>
            </div>
            <Row
              // gutter={{ xs: [8, 8], sm: [16, 16], md: [24, 24], lg: [32, 32] }}
              gutter={[
                { sm: 16, lg: 32 },
                { sm: 16, lg: 32 },
              ]}
              className="opensea-cards"
            >
              {cards.map((_card, _i) => {
                let selected = selectedIds.includes(_card.id);
                return (
                  <Col
                    key={_i}
                    className="gutter-row"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 6 }}
                  >
                    <div
                      className={`opensea-card ${selected ? "selected" : ""}`}
                      onClick={() => onClickCard(_card.id)}
                    >
                      {selected ? (
                        <div className="icon-checked">
                          <FaCheck />
                        </div>
                      ) : (
                        <div className="icon-plus">
                          <FaPlus />
                        </div>
                      )}
                      <div className="card-img">
                        <Image src={_card.img} />
                      </div>
                      <div className="card-content">
                        <h6>{_card.title}</h6>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <div className="btn-back-wrapper">
              <Button className="btn-back btn-blueDark">Verify Details</Button>
            </div>
          </div>
        </div>
      </Container>
    </OpenSeaContainer>
  );
}

export default OpenSea;
