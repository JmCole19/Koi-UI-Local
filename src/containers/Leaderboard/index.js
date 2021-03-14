/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { koi_tools } from "koi_tools";
import { ScaleLoader } from "react-spinners";
import { LeaderboardContainer, StyledThumb } from "./style";
import { Collapse } from "antd";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";
import { DataContext } from "contexts/DataContextContainer";
import ModalContent from "components/Elements/ModalContent";

const { Panel } = Collapse;
const options = ["24h", "1w", "1m", "1y", "all"];

// const contents = [
//   {
//     balances: { "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU": 1 },
//     description:
//       "'The Delights of Purim' at the Israeli Opera, photo by Ziv Barak",
//     name: "Kayla",
//     owner: "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU",
//     ticker: "KRK",
//     totalReward: 0,
//     totalViews: 0,
//     twentyFourHrViews: 0,
//     txIdContent: "EKW3AApL4mdLc6sIhVr3Cn8VN7N9VAQUp2BNALHXFtQ",
//   },
// ];

const ktools = new koi_tools();

function Leaderboard() {
  const history = useHistory();
  const { contents, setContents } = useContext(DataContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);

  const onClickItem = (item, type) => {
    if (type === "view") {
      history.push(`/content-detail/${item.txIdContent}?type=view`);
    } else {
      setSelectedContent(item);
      setModalType(type);
      setShowModal(true);
    }
  };

  const onSwitchModal = () => {
    setModalType(modalType === "share" ? "embed" : "share");
  };

  const onClickShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickPlus = () => {
    history.push("/register-content");
  };

  const onClickMyContent = () => {
    setIsFiltered(!isFiltered);
    setIsLoading(true);
    ktools.retrieveTopContent().then((res) => {
      setContents(res);
      setIsLoading(false);
      console.log({ res });
      if (isFiltered) {
        setContents(res);
      } else {
        setContents(res.filter((_item) => _item.name === "Kayla"));
      }
    });
  };

  const onClickUsername = (item) => {
    setIsFiltered(true);
    setContents(contents.filter((_item) => _item.name === item.name));
  };

  const getContents = async () => {
    if (contents.length === 0) {
      setIsLoading(true);
      ktools.retrieveTopContent().then((res) => {
        setContents(res);
        setIsLoading(false);
        console.log({ res });
      });
    }
  };

  useEffect(() => {
    getContents();
  }, [history.location.pathname]);

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
          {isLoading ? (
            <div className="loading-container">
              <ScaleLoader size={15} color={"#2a58ad"} />
            </div>
          ) : (
            contents
              .filter((_item, _i) => _i < 5)
              .map((_item, _i) => (
                <LeaderboardItem
                  key={_i}
                  item={_item}
                  order={_i}
                  onClickItem={() => onClickItem(_item, "view")}
                  onClickUsername={() => onClickUsername(_item)}
                  onClickShare={() => onClickItem(_item, "share")}
                  onClickEmbed={() => onClickItem(_item, "embed")}
                />
              ))
          )}
          <Collapse
            activeKey={isExpanded ? ["1"] : null}
            bordered={false}
            expandIcon={() => <div />}
          >
            <Panel header={null} key="1">
              {contents
                .filter((_item, _i) => _i >= 5)
                .map((_item, _i) => (
                  <LeaderboardItem
                    key={_i}
                    item={_item}
                    order={_i + 5}
                    onClickItem={() => onClickItem(_item, "view")}
                    onClickUsername={() => onClickUsername(_item)}
                    onClickShare={() => onClickItem(_item, "share")}
                    onClickEmbed={() => onClickItem(_item, "embed")}
                  />
                ))}
            </Panel>
          </Collapse>
          {contents.length > 5 && (
            <div className="btn-show-more-wrapper">
              <Button className="btn-show-more" onClick={onClickShowMore}>
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <ModalContent
        type={modalType}
        show={showModal}
        detail={selectedContent}
        onHide={() => setShowModal(false)}
        onSwitchModal={onSwitchModal}
      />
    </LeaderboardContainer>
  );
}

export default Leaderboard;
