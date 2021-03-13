/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { Button, Container, Image } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import { FaCheck, FaPlus } from "react-icons/fa";
import { UploadOpenSeaContainer } from "./style";
import { useHistory } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";

const testOpenseaAddress = '0xd703accc62251189a67106f22d54cd470494de40'

function UploadOpenSea() {
  const history = useHistory();
  const {openSeas, setOpenSeas} = useContext(DataContext);
  const { address } = queryString.parse(history.location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const onClickCard = (cardId) => {
    let tempSelectedCards = [...selectedIds];
    if (tempSelectedCards.includes(cardId)) {
      setSelectedIds(tempSelectedCards.filter((_cardId) => _cardId !== cardId));
    } else {
      setSelectedIds([...tempSelectedCards, cardId]);
    }
  };

  const onSelectAll = () => {
    setIsAllSelected(!isAllSelected);
  };

  const onClickVerify = () => {
    // history.push(`/confirm-opensea?address=${testOpenseaAddress}&step=1&selected=${selectedIds.join('_')}`)
    history.push(`/confirm-opensea?address=${address}&step=1&selected=${selectedIds.join('_')}`)
  }

  useEffect(() => {
    if (isAllSelected) {
      setSelectedIds(openSeas.map((_card) => _card.id));
    } else {
      setSelectedIds([]);
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (address) {
      setIsLoading(true);
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
          setIsLoading(false);
        });
    }
  }, [history.location.pathname]);

  return (
    <UploadOpenSeaContainer>
      <Container>
        <div className="opensea-content-wrapper">
          <div className="opensea-content">
            <h1 className="text-blue opensea-title">Your OpenSea content</h1>
            <h4 className="opensea-description">
              Select your NFTs to upload them to Arweave’s permaweb. You’ll earn
              rewards every time someone views them!
            </h4>
            <div className="counts-wrapper">
              <div
                className={`selected-counts ${
                  selectedIds.length > 0 && "isSet"
                }`}
              >
                {selectedIds.length}
              </div>
              <Button
                className={`btn-all ${isAllSelected && "selected-all"}`}
                onClick={onSelectAll}
              >
                Select all NFTs
              </Button>
            </div>
            {isLoading ? (
              <div className="loading-container">
                <ScaleLoader size={15} color={"#2a58ad"} />
              </div>
            ) : (
              <Row
                // gutter={{ xs: [8, 8], sm: [16, 16], md: [24, 24], lg: [32, 32] }}
                gutter={[
                  { sm: 16, lg: 32 },
                  { sm: 16, lg: 32 },
                ]}
                className="opensea-cards"
              >
                {openSeas.length > 0 &&
                  openSeas.map((_card, _i) => {
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
                          className={`opensea-card ${
                            selected ? "selected" : ""
                          }`}
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
                            <Image src={_card.image_thumbnail_url} />
                          </div>
                          <div className="card-content">
                            <h6>{_card.name}</h6>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            )}
            <div className="btn-back-wrapper">
              <Button className="btn-back btn-blueDark" disabled={selectedIds.length === 0} onClick={onClickVerify}>Verify Details</Button>
            </div>
          </div>
        </div>
      </Container>
    </UploadOpenSeaContainer>
  );
}

export default UploadOpenSea;
