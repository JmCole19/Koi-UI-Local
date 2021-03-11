/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Logo, IconLeft, ItemTempModal } from "assets/images";
import { LeaderboardContainer, StyledThumb } from "./style";
import { Collapse } from "antd";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";

const { Panel } = Collapse;

const itemsTemp = [
  {
    id: '1',
    title: "Batman",
    username: "Maxstealth",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '2',
    title: "Mercury (The Planets #1)",
    username: "alexmorris",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '3',
    title: "Vitalik Buterin Gold Edition 1/100",
    username: "vitalikbuterin",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '4',
    title: "Astrid’s cute little face",
    username: "kaylakroot",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '5',
    title: "Mercury (The Planets #1)",
    username: "alexmorris",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '6',
    title: "Batman",
    username: "alexmorris",
    created_at: "Jan, 01, 2021",
    total_reviews: 795,
    rewards: 10658,
  },
  {
    id: '7',
    title: "Batman",
    username: "alexmorris",
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
  const [isFiltered, setIsFiltered] = useState(false);
  const [items, setItems] = useState(itemsTemp);

  const [showModalItem, setShowModalItem] = useState(false);

  const handleClose = () => setShowModalItem(false);

  const onClickItem = (item) => {
    setSelectedItem(item);
    history.push(`/content-detail/${item.id}?type=view`)
    // setShowModalItem(true);
  };
  const onClickShare = (item) => {
    history.push(`/content-detail/${item.id}?type=share`)
    // setShowModalItem(true);
  };
  const onClickEmbed = (item) => {
    history.push(`/content-detail/${item.id}?type=embed`)
    // setShowModalItem(true);
  };

  const onClickShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickPlus = () => {
    history.push("/register-content");
  };

  const onClickMyContent = () => {
    setIsFiltered(!isFiltered);
    if (isFiltered) {
      setItems(itemsTemp);
    } else {
      setItems(items.filter((_item) => _item.username === "alexmorris"));
    }
  };

  const onClickUsername = (item) => {
    setIsFiltered(true);
    setItems(items.filter((_item) => _item.username === item.username));
  }

  return (
    <LeaderboardContainer>
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h2 className="text-blue mb-0">
            {isFiltered ? "My Content" : "Top Content"}
          </h2>
          <ReactSlider
            className="filter-options-desktop mr-auto d-none d-md-flex"
            marks
            markClassName="example-mark"
            min={0}
            max={4}
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
          <Button className="btn-my-content" onClick={onClickMyContent}>
            {!isFiltered ? "My Content" : "Top Content"}
          </Button>
          <Button className="btn-leaderbard-plus" onClick={onClickPlus}>
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <div className="leaderboard-items">
          {items
            .filter((_item, _i) => _i < 5)
            .map((_item, _i) => (
              <LeaderboardItem
                key={_i}
                item={_item}
                order={_i}
                onClickItem={() => onClickItem(_item)}
                onClickUsername={() => onClickUsername(_item)}
                onClickShare={() => onClickShare(_item)}
                onClickEmbed={() => onClickEmbed(_item)}
              />
            ))}
          <Collapse
            activeKey={isExpanded ? ["1"] : null}
            bordered={false}
            expandIcon={() => <div />}
          >
            <Panel header={null} key="1">
              {items
                .filter((_item, _i) => _i >= 5)
                .map((_item, _i) => (
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
    </LeaderboardContainer>
  );
}

export default Leaderboard;
