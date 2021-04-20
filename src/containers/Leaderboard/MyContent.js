/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
// import { koi_tools } from "koi_tools";
import { ScaleLoader } from "react-spinners";
import { LeaderboardContainer, StyledThumb, LinkNftUpload } from "./style";
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
import MetaWrapper from "components/Wrappers/MetaWrapper";

const { Panel } = Collapse;
const options = ["24h", "1w", "1m", "1y", "all"];

// const ktools = new koi_tools();

function MyContent() {
  const history = useHistory();
  const { addressAr } = useContext(DataContext);
  const [contents, setContents] = useState([]);
  const [sliderValue, setSliderValue] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errEmessage, setErrMessage] = useState('');

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

  const onClickContents = () => {
    history.push('/contents')
  };

  const onClickUsername = (item) => {
    setContents(contents.filter((_item) => _item.name === item.name));
  };

  const onSliderChange = (newVal) => {
    // const options = ["24h", "1w", "1m", "1y", "all"];
    setSliderValue(newVal)
    console.log({ newVal })
    let offset = 0
    switch (options[newVal]) {
      case "24h":
        offset = 3600 * 24
        break;
      case "1w":
        offset = 3600 * 24 * 7
        break;
      case "1m":
        offset = 3600 * 24 * 30
        break;
      case "1y":
        offset = 3600 * 24 * 365
        break;
      case "all":
        offset = 0
        break;
      default:
        offset = 0
        break;
    }
    if (offset === 0) {
      setContents(contents)
    } else {
      const cur = new Date()
      const timestamp = Number(cur.getTime() - offset * 1000)
      setContents(contents.filter((_item) => _item.created_at > timestamp))
    }
  }

  const getContents = async (walletAddress = '') => {
    // console.log("keyAr" , JSON.stringify(keyAr))
    if(!addressAr) {
      history.push("/wallet-key");
    }
    axios.get('https://bundler.openkoi.com:8888/state/getTopContent/')
    .then((res) => {
      const data = res.data
      // console.log({ data });
      if(data === 0) {
        show_alert("There are no contents.")  
      }else{
        let res_data = []
        data.forEach(element => {
          if(element.owner === addressAr) {
            let str_created_at = element.createdAt || "1609500000"
            let created_at = Number(str_created_at) * 1000
            element.created_at = created_at
            res_data.push(element)
          }
        });
        console.log(res_data)
        setContents(res_data);
      }
    }).catch( err => {
      console.log(err)
      show_alert('There is an error')
    }).finally( () => setIsLoading(false));
    // if (keyAr) {
    //   setIsLoading(true);
    //   console.log("my content", keyAr)
    //   await ktools.loadWallet(keyAr)
    //   ktools.myContent(addressAr).then((res) => {
    //     if (res.length === 0) {
    //       show_alert(`Our school of koi couldn't find anything on that wallet[${addressAr}].`)
    //     } else {
    //       let res_data = []
    //       res.forEach(element => {
    //         let str_created_at = element.createdAt || "1609500000"
    //         let created_at = Number(str_created_at) * 1000
    //         element.created_at = created_at
    //         res_data.push(element)
    //       });
    //       console.log(res_data)
    //       setContents(res_data);
    //     }
    //     console.log({ res });
    //   }).catch(err => {
    //     console.log(err)
    //     show_alert("There is an error to getting NFT contents.")
    //   }).finally(() => {
    //     console.log("finally")
    //     setIsLoading(false);
    //   });
    // } else {
    //   show_alert(`Please upload your wallet key file by selecting the "Connect Wallet" button.`)
    // }
  };
  useEffect(() => {
    setTimeout(() => getContents(), 1000);
  }, [history.location.pathname]);

  const show_alert = (message = '') => {
    setShowAlert(true)
    setErrMessage(message)
    setTimeout(() => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  return (
    <MetaWrapper>
      <LeaderboardContainer>
        <div className="leaderboard">
          <div className="leaderboard-header">
            <h2 className="text-blue mb-0">
              My Content
            </h2>
            <ReactSlider
              className="filter-options-desktop mr-auto d-none d-md-flex"
              marks
              markClassName="example-mark"
              min={0}
              max={4}
              value={sliderValue}
              onChange={(v) => onSliderChange(v)}
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
              value={sliderValue}
              onChange={(v) => onSliderChange(v)}
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => (
                <div {...props}>{options[state.valueNow]}</div>
              )}
            />
            <Button className="btn-my-content" onClick={onClickContents}>
              Top Content
            </Button>
            <Button className="btn-leaderbard-plus" onClick={onClickPlus}>
              <i className="fas fa-plus"></i>
            </Button>
          </div>
          {!isLoading && !contents.length && <ImportArea>
            <LinkNftUpload className={`big cursor`} onClick={() => history.push('/register-content')}>
              <div className="font-n-1">You haven't permanently stored any content yet.</div>
              <div className="font-n-1"><b>Let's fix that.</b></div>
              <div className="text-center mt-4 mb-4 cursor">
                <div className='font-s-1'>
                  <span>
                    <Image src={IconUpload} width={32} className="overlay-opensea" />
                    <Image src={IconOpenSea} width={32} />
                  </span>
                  <b>&nbsp;&nbsp;&nbsp; Click to upload an image</b> or connect your OpenSea account</div>
              </div>
              <div className='font-s-1'>What are you waiting for? <b>Start earning KOI.</b></div>
            </LinkNftUpload>
          </ImportArea>}
          <AlertArea
            showMessage={showAlert}
            message={errEmessage}
            cancel={() => setShowAlert(false)}
            showCancel={true}
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
    </MetaWrapper>
  );
}

export default MyContent;
