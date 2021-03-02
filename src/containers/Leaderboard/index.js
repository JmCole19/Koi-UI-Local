/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Container, Image, Modal } from "react-bootstrap";
import {
  Crown,
  DefaultUser,
  Logo,
  IconLeft,
  ItemTempModal,
} from "assets/images";
import { HomeContainer, StyledThumb } from "./style";
import { Collapse } from "antd";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";

const { Panel } = Collapse;

const items = [
  {
    title: "Batman",
    username: "Maxstealth",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Mercury (The Planets #1)",
    username: "alexmorris",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Vitalik Buterin Gold Edition 1/100",
    username: "vitalikbuterin",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Astrid’s cute little face",
    username: "kaylakroot",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Mercury (The Planets #1)",
    username: "alexmorris",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Batman",
    username: "Maxstealth",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    title: "Batman",
    username: "Maxstealth",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
];

const options = ["24h", "1w", "1m", "1y", "all"];

function Leaderboard() {
  const history = useHistory();
  // const [activeOption, setActiveOption] = useState("24h");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [showModalItem, setShowModalItem] = useState(false);

  const handleClose = () => setShowModalItem(false);

  const onClickItem = (item) => {
    setSelectedItem(item);
    setShowModalItem(true);
  };

  const onClickShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickPlus = () => {
    history.push("/register-content");
  };
  return (
    <HomeContainer>
      <Container fluid className="py-5">
        <div className="leaderboard">
          <div className="leaderboard-header">
            <h2 className="text-white mb-0">Top Content</h2>
            <ReactSlider
              className="filter-options-desktop mr-auto d-none d-md-flex"
              marks
              markClassName="example-mark"
              min={0}
              max={4}
              // thumbClassName="example-thumb"
              trackClassName="example-track"
              renderMark={(props) => (
                <span key={props.key} className="example-mark">
                  {options[props.key]}
                </span>
              )}
              renderThumb={(props, state) => (
                <StyledThumb {...props} value={state.valueNow}>
                  {options[state.valueNow]}
                </StyledThumb>
              )}
            />
            <ReactSlider
              className="filter-options-mobile d-md-none"
              marks
              markClassName="example-mark"
              min={0}
              max={4}
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => (
                <div {...props}>{options[state.valueNow]}</div>
              )}
            />
            {/* <InputGroup className="leader-board-search-input ml-4" wi>
              <FormControl aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup> */}
            <Image src={Crown} className="icon-crown d-none d-md-flex cursor" />
            <Image
              src={DefaultUser}
              className="icon-user d-none d-md-flex cursor"
              onClick={() => history.push("/check-out")}
            />
            <Button className="btn-leaderbard-plus" onClick={onClickPlus}>
              <i className="fas fa-plus"></i>
            </Button>
          </div>
          <div className="leaderboard-items">
            {items.filter((_item, _i) => _i < 5).map((_item, _i) => (
              <LeaderboardItem
                key={_i}
                item={_item}
                order={_i}
                onClickItem={() => onClickItem(_item)}
              />
            ))}
            <Collapse
              activeKey={isExpanded ? ["1"] : null}
              bordered={false}
              expandIcon={() => <div />}
            >
              <Panel header={null} key="1">
                {items.filter((_item, _i) => _i >= 5).map((_item, _i) => (
                  <LeaderboardItem
                    key={_i}
                    item={_item}
                    order={_i + 5}
                    onClickItem={() => onClickItem(_item)}
                  />
                ))}
              </Panel>
            </Collapse>
            <div className="btn-show-more-wrapper">
              <Button className="btn-show-more" onClick={onClickShowMore}>
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        show={showModalItem}
        onHide={handleClose}
        dialogClassName="item-modal"
      >
        <Modal.Body>
          <div className="item-modal-header">
            <Image src={IconLeft} className="cursor" onClick={handleClose} />
            <h2 className="text-white mb-0">Genesis</h2>
            <Button className="btn-orange ml-auto">Back It</Button>
            <Button className="btn-green ml-4">Buy It</Button>
          </div>
          <div className="item-modal-body">
            <div className="img-wrapper">
              <Image src={ItemTempModal} />
            </div>
            <div className="item-info-wrapper">
              <div className="item-info-left item-col">
                <h1 className="item-title mb-1 text-blue">
                  {selectedItem.title}
                </h1>
                <p className="item-username mb-0 text-blue">
                  {selectedItem.username}
                </p>
              </div>
              <div className="item-info-right">
                <h5 className="item-total_reviews mb-0 text-blue">
                  {selectedItem.total_reviews}{" "}
                  <span className="text-greenDark">total views</span>
                </h5>
                <h5 className="item-rewards mb-0 text-blue">
                  {selectedItem.rewards}{" "}
                  <span>
                    <Image src={Logo} width={30} />
                  </span>{" "}
                  <span className="text-greenDark">rewards</span>
                </h5>
                <p className="mb-0 text-blue">
                  Since {selectedItem.created_at}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </HomeContainer>
  );
}

export default Leaderboard;
