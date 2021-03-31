/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Modal } from "antd";
import {
  Logo,
  IconArweave,
  IconEthereum,
  IconFish
} from "assets/images";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Navbar, Nav, Image, Overlay, Tooltip } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { TopbarContainer } from "./style";
import { show_notification, show_ar_balance, show_digit_number } from "service/utils";
import Arweave from "arweave";
import { colors } from "theme";

const arweave = Arweave.init();

function Topbar() {
  const history = useHistory();
  const {
    balanceKoi,
    balanceAr,
    setAddressAr,
    addressEth,
    setAddressEth,
  } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [detectorAr, setDetectorAr] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const activeArweave = () => {
    setDetectorAr(true);
    // setBalanceKoi(50.01);
    // setBalanceAr(50.01);
  };

  const activeEthereum = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        setAddressEth(accounts[0]);
        // show_notification("Imported your ethereum account.", "KOI", "success");
      } catch (err) {
        console.log(err);
        // show_notification(
        //   "There is an error to import your ethereum account",
        //   "KOI"
        // );
      }
    } else {
      // metamask extension didn't install
      show_notification("Please install metamask extension first.", "KOI");
      setTimeout(() => {
        let url = "https://metamask.io/download.html";
        window.open(url, "_blank");
      }, 2000);
    }
  };
  const activeKoi = async () => {
    if (!addressEth) {
      await activeEthereum();
      activeArweave();
    } else {
      activeArweave();
    }
  };

  useEffect(() => {
    if (detectorAr) {
      window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
      return () => {
        window.removeEventListener("arweaveWalletLoaded", () => {});
      };
    }
  }, [detectorAr]);

  const detectArweaveWallet = async () => {
    try {
      let addr = await arweave.wallets.getAddress();
      console.log("detected arweave wallet address : ", addr);
      if (addr) {
        setAddressAr(addr);
        history.push("/wallet-key");
      } else {
        // show alert
        history.push("/wallet-key");
        // show_notification(
        //   "There is a problem to get your arwallet address. Please install arconnect extension and try again."
        // );
      }
    } catch (err) {
      // console.log(err);
      history.push("/wallet-key");
      // show_notification("Error on detectimg Arweave wallet address");
    }
  };

  return (
    <TopbarContainer collapseOnSelect expand="md" fixed="top">
      <Link to="/" className="navbar-brand">
        <Image src={Logo} />
        <span className="version-beta">BETA</span>
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
            <Space size={12} className="btns-connect cursor" onClick={() => setShow(!show)}>
              <span className="text-blue mb-0 text-bold">{show_digit_number(balanceKoi)}</span>
              <Image
                ref={target}
                src={IconFish}
                className="cursor"
                width={18}
              />
              <span className="text-blue mb-0 text-bold">{show_ar_balance(balanceAr)}</span>
              <Image
                ref={target}
                src={IconArweave}
                className="cursor"
                width={18}
              />
            </Space>
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
          <h2 className="modal-title text-blue">Welcome to the KOI beta</h2>
          <div className="modal-row mb-2">
            <div className="modal-row-left">
              <p className="text-blue mb-0">
                AR to upload: <b>0.0002 AR</b> / NFT{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </TopbarContainer>
  );
}

export default Topbar;
