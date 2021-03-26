/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { koi_tools } from "koi_tools";
import { ScaleLoader } from "react-spinners";
import { LeaderboardContainer, StyledThumb, LinkNftUpload } from "./style";
import { Collapse } from "antd";
import ReactSlider from "react-slider";
import { useHistory } from "react-router-dom";
import LeaderboardItem from "./LeaderboardItem";
import { DataContext } from "contexts/DataContextContainer";
import ModalContent from "components/Elements/ModalContent";
import { show_notification } from "service/utils";
import AlertArea from "components/Sections/AlertArea";
import Arweave from "arweave";
import { alertTimeout } from "config";
import ImportArea from "components/Sections/ImportArea";
import { IconUpload, IconOpenSea } from "assets/images";

const arweave = Arweave.init();
const { Panel } = Collapse;
const options = ["24h", "1w", "1m", "1y", "all"];

const ktools = new koi_tools();

function MyContent() {
  const history = useHistory();
  const { addressAr, setAddressAr } = useContext(DataContext);
  const [contents, setContents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("share");
  const [selectedContent, setSelectedContent] = useState([]);
  const [detectorAr, setDetectorAr] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errEmessage, setErrMessage] = useState('');
  const [fixedArea, setFixedArea] = useState(false);

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

  const getContents = async (walletAddress = '') => {
    // if (contents.length === 0) {
    //   console.log("here2")
    // }
    walletAddress = walletAddress || addressAr || ''
    console.log({walletAddress})
    console.log({addressAr})
    if(walletAddress) {
      setIsLoading(true);
      console.log("here3 : ", walletAddress)
      ktools.myContent(walletAddress).then((res) => {
        if(res.length === 0) {
          show_alert("There is no contents.")  
        }else{
          setContents(res);
        }
        console.log({ res });
      }).catch(err => {
        console.log(err)
        show_notification("There is an error to getting NFT contents.")
      }).finally( () => {
        console.log("finally")
        setIsLoading(false);
      });
    }else{
      if(!detectorAr){
        setTimeout(() => {
          setDetectorAr(true)
        }, 100)
      }else{
        // show alert
        show_alert('There is a problem to get your arwallet address. Please install arconnect extension and try again.1111')
      }
    }
  };

  const listenScrollEvent = () => {
    console.log("scroll : ",window.scrollY)
    if (window.scrollY > 40) {
      setFixedArea(true)
    } else {
      setFixedArea(false)
    }
  }
  useEffect(() => {
    window.addEventListener("mousewheel", listenScrollEvent());
      return () => {
        window.removeEventListener("mousewheel", listenScrollEvent());
    };
  }, []);
  useEffect(function subscribeToWheelEvent() {
    const updateScroll = function(e) {
      if(!!e.deltaY) {
        console.log("cusor: ",e)
        console.log("cusor: ",e.offsetY)
        console.log("cusor: ",e.y)
        console.log("cusor: ",e.screenY)
        console.log("cusor: ",e.pageY)
        // setState((currentState)=>{
        //      const delta = Math.sign(e.deltaY) * 10.0;
        //      const val = Math.max(0, currentState.scrollTop + delta);
        //      return {scrollTop:val}   
        // })            
      } else {
        console.log('zero', e.deltaY);
      }
    }
    window.addEventListener('mousewheel', updateScroll);
    console.log('subscribed to wheelEvent')
    return function () {
      window.removeEventListener('mousewheel', updateScroll);
    }
  }, []);
  useEffect(() => {
    getContents();
  }, [history.location.pathname]);

  useEffect(() => {
    if (detectorAr) {
      window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
      return () => {
        window.removeEventListener(
          "arweaveWalletLoaded",
          () => {}
        );
      };
    }
  }, [detectorAr]);

  const detectArweaveWallet = async () => {
    try {
      let addr = await arweave.wallets.getAddress();
      console.log("detected arweave wallet address : ", addr);
      if (addr) {
        getContents(addr)
        setAddressAr(addr);
      } else {
        // show alert
        show_alert('There is a problem to get your arwallet address. Please install arconnect extension and try again.')
      }
    } catch (err) {
      console.log(err);
      show_alert('Error on detectimg Arweave wallet address')
    }
  };

  const show_alert = (message = '') => {
    setShowAlert(true)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  return (
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
          <Button className="btn-my-content" onClick={onClickContents}>
            Top Content
          </Button>
          <Button className="btn-leaderbard-plus" onClick={onClickPlus}>
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <ImportArea>
          <LinkNftUpload className={`test ${fixedArea ? 'fixedArea' : 'blockArea'}`}>
            <div className="font-n-1">You haven't permanently stored any content yet.</div>
            <div className="font-n-1"><b>Let's fix that.</b></div>
            <div className="text-center mt-4 mb-4 cursor" onClick={() => history.push('/register-content')}>
              <div className='font-s-1'>
                <span>
                  <Image src={IconUpload} width={32} className="overlay-opensea" />
                  <Image src={IconOpenSea} width={32} />
                </span>
                <b>&nbsp;&nbsp;&nbsp; Click to upload an image</b> or connect your OpenSea account</div>
            </div>
            <div className='font-s-1'>What are you waiting for? <b>Start earning KOI.</b></div>
          </LinkNftUpload>
        </ImportArea>
        <AlertArea
          showMessage={showAlert}
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
  );
}

export default MyContent;
