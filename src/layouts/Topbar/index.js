/* eslint-disable react-hooks/exhaustive-deps */
import { Space } from "antd";
import {
  Logo,
  IconArweave,
  IconEthereum,
  IconFish
} from "assets/images";
import React, { useContext, useState, useRef } from "react";
import { Navbar, Nav, Image, Overlay, Tooltip, Modal, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { TopbarContainer } from "./style";
import { show_ar_balance, show_digit_number } from "service/utils";
import { colors } from "theme";

let versionUpContent = '<p>Koi is currently in BETA. We are building decentralized web services, and sometimes things break unexpectantly. </p>';
versionUpContent += '<p><b>03/21/2021</b> - When you use a Koi portal, nodes in the Koi network serve your requests, and store data for you in permanent decentralized storage on the Arweave network.</p>'
versionUpContent += '<p><b>03/28/2021</b> - We’re working to make it possible to tip artists fee-lessly, as well as pay them by viewing their content, but please bear with us as we work out the kinks!</p>'
versionUpContent += '<p>If you want to talk more about what we’re doing or make suggestions to improve the interface, hit us up on our <a href="https://discord.gg/dRsAJ6kAcP" target="_blank">Discord</a>.</p>'

function Topbar() {
  const history = useHistory();
  const {
    balanceKoi,
    balanceAr,
    setAddressAr,
    keyAr,
    setKeyAr,
    setBalanceKoi,
    setBalanceAr
  } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  // const [detectorAr, setDetectorAr] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const activeArweave = () => {
  //   // setDetectorAr(true);
  //   // setBalanceKoi(50.01);
  //   // setBalanceAr(50.01);
  // };

  // const activeEthereum = async () => {
  //   if (window.ethereum) {
  //     try {
  //       const accounts = await window.ethereum.enable();
  //       setAddressEth(accounts[0]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     // metamask extension didn't install
  //     show_notification("Please install metamask extension first.", "KOI");
  //     setTimeout(() => {
  //       let url = "https://metamask.io/download.html";
  //       window.open(url, "_blank");
  //     }, 2000);
  //   }
  // };
  const activeKoi = async () => {
    // if (!addressEth) {
    //   await activeEthereum();
    // }
    if (!keyAr) {
      history.push("/wallet-key");
    }
  };
  const onClickDisconnectWallet = () => {
    setAddressAr(null)
    setKeyAr(null)
    setBalanceKoi(null)
    setBalanceAr(null)
    setShow(false)
  }

  // useEffect(() => {
  //   if (detectorAr) {
  //     window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
  //     return () => {
  //       window.removeEventListener("arweaveWalletLoaded", () => {});
  //     };
  //   }
  // }, [detectorAr]);

  // const detectArweaveWallet = async () => {
  //   try {
  //     let addr = await arweave.wallets.getAddress();
  //     console.log("detected arweave wallet address : ", addr);
  //     if (addr) {
  //       setAddressAr(addr);
  //       history.push("/wallet-key");
  //     } else {
  //       // show alert
  //       history.push("/wallet-key");
  //       // show_notification(
  //       //   "There is a problem to get your arwallet address. Please install arconnect extension and try again."
  //       // );
  //     }
  //   } catch (err) {
  //     // console.log(err);
  //     history.push("/wallet-key");
  //     // show_notification("Error on detecting Arweave wallet address");
  //   }
  // };
  
  return (
    <TopbarContainer collapseOnSelect expand="md" fixed="top">
      <Link to="/" className="navbar-brand">
        <span className="version-beta">BETA</span>
        <Image src={Logo} />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <i className="fas fa-bars"></i>
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <span className="btn-nav cursor" onClick={() => setShowModal(true)}>
            BETA
          </span>
          <Link to="/faucet?step=0" className="btn-nav">
            Faucet
          </Link>
          <a
            href="https://openkoi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav"
          >
            OpenKoi
          </a>
          {balanceKoi === null ? (
            <Space
              size={12}
              className="btns-connect cursor"
              onClick={activeKoi}
            >
              <p className="text-blue mb-0 text-bold">Connect Wallet</p>
              <Image src={IconArweave} className="cursor" width={18} />
              <Image src={IconEthereum} className="cursor" width={18} />
            </Space>
          ) : (
            <div ref={target} className="dropdown-area">
              <Space size={12} className="btns-connect cursor" onClick={() => setShow(!show)}>
                <span className="text-blue mb-0 text-bold">{show_digit_number(balanceKoi)}</span>
                <Image
                  src={IconFish}
                  className="cursor"
                  width={18}
                />
                <span className="text-blue mb-0 text-bold">{show_ar_balance(balanceAr)}</span>
                <Image
                  src={IconArweave}
                  className="cursor"
                  width={18}
                />
              </Space>
            </div>
          )}
          {/* <Image
            src={DefaultUser}
            ref={target}
            className="icon-user d-none d-md-flex cursor"
            onClick={() => setShow(!show)}
          />*/}
          <Overlay
            target={target.current}
            show={show}
            onHide={() => setShow(false)}
            placement="bottom-end"
            rootClose
          >
            {(props) => (
              <Tooltip
                id="overlay-nav"
                {...props}
                arrowProps={{ style: { display: "none" } }}
              >
                <div className="overlay-header">
                  <p onClick={() => history.replace('/my-content') } className="text-left text-bold cursor">See my content</p>
                </div>
                <div className="overlay-body">
                  <div className="overlay-body-row">
                    <p className="text-bold">Account summary</p>
                  </div>
                  {/* <div className="overlay-body-row">
                    <p>Total views</p>
                    <p className="overlay-value">7,124</p>
                    <Image src={IconEyes} className="ml-2" />
                  </div> */}
                  <div className="overlay-body-row">
                    <p>KOI </p>
                    <p className="overlay-value">{show_digit_number(balanceKoi)}</p>
                    <Image src={IconFish} className="ml-2" />
                  </div>
                  <div className="overlay-body-row">
                    <p>AR </p>
                    <p className="overlay-value">{show_ar_balance(balanceAr)}</p>
                    <Image src={IconArweave} className="ml-2" />
                  </div>
                  <div className="overlay-body-row mt-3">
                    <Button
                      className="btn-disconnect mt-auto mx-auto"
                      onClick={onClickDisconnectWallet}
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </Nav>
      </Navbar.Collapse>
      <Modal
        show={showModal}
        centered
        dialogClassName="modal-confirm-transaction"
        onHide={() => setShowModal(false)}
      >
        <Modal.Body>
          <FaTimes
            className="icon-close cursor"
            color={colors.blueDark}
            size={24}
            onClick={() => setShowModal(false)}
          />
          <h2 className="modal-title text-blue">Welcome to the KOI <span className='lbl-beta'>beta</span></h2>
          <div className="modal-row mb-2">
            <div className="modal-row-left">
              <div className="text-blue mb-4 ml-4 mr-4 mt-4 text-center" 
               dangerouslySetInnerHTML={{__html: versionUpContent}}></div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </TopbarContainer>
  );
}

export default Topbar;
