/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
// import { koi_tools } from "koi_tools";
import { ScaleLoader } from "react-spinners";
import { LeaderboardContainer, LinkNftUpload, StyledThumb } from "./style";
import { Collapse } from "antd";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";
import { DataContext } from "contexts/DataContextContainer";
import ModalContent from "components/Elements/ModalContent";
import axios from "axios";
// import { show_notification } from "service/utils";
import AlertArea from "components/Sections/AlertArea";
import { alertTimeout } from "config";
import ImportArea from "components/Sections/ImportArea";
import { IconUpload, IconOpenSea } from "assets/images";

const { Panel } = Collapse;
const options = ["24h", "1w", "1m", "1y", "all"];
// const ktools = new koi_tools();

function Leaderboard() {
  const history = useHistory();
  const { contents, setContents } = useContext(DataContext);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [errEmessage, setErrMessage] = useState('');

  const show_alert = (message = '', type = 'danger') => {
    setShowAlert(true)
    setAlertVariant(type)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

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
    history.push('/my-content')
  };

  const onClickUsername = (item) => {
    // setIsFiltered(true);
    setContents(contents.filter((_item) => _item.name === item.name));
  };

  const getContents = async () => {
    if (contents.length === 0) {
      setIsLoading(true);
      axios.get('https://bundler.openkoi.com:8888/state/getTopContent/')
      .then((res) => {
        const data = res.data
        // console.log({ data });
        if(data === 0) {
          show_alert("There is no contents.")  
        }else{
          setContents(data);
        }
      }).catch( err => {
        console.log(err)
        show_alert('There is an error')
      }).finally( () => setIsLoading(false));
      // ktools.retrieveTopContent().then((res) => {
      //   setContents(res);
      //   console.log({ res });
      // }).catch( err => console.log(err)).finally( () => setIsLoading(false));
    }
  };

  useEffect(() => {
    getContents();
  }, [history.location.pathname]);

  return (
    <>
      <LeaderboardContainer>
        <div className="leaderboard">
          <div className="leaderboard-header">
            <h2 className="text-blue mb-0">
              Top Content
              {/* {isFiltered ? "My Content" : "Top Content"} */}
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
              My Content
              {/* {!isFiltered ? "My Content" : "Top Content"} */}
            </Button>
            <Button className="btn-leaderbard-plus" onClick={onClickPlus}>
              <i className="fas fa-plus"></i>
            </Button>
          </div>
          <ImportArea>
            <LinkNftUpload>
              <div className="cursor" onClick={() => history.push('/register-content')}>
                <div className='font-s-1'>
                  <span>
                    <Image src={IconUpload} width={32} className="overlay-opensea" />
                    <Image src={IconOpenSea} width={32} />
                  </span>
                  <b>&nbsp;&nbsp;&nbsp; Click to upload an image</b> or connect your OpenSea account</div>
              </div>
            </LinkNftUpload>
          </ImportArea>
          <AlertArea
            showMessage={showAlert}
            variant={alertVariant}
            message={errEmessage}
          ></AlertArea>
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
    </>
  );
}

export default Leaderboard;
