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
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { TopbarContainer } from "./style";
import { show_notification, show_ar_balance, show_digit_number } from "service/utils";
import Arweave from "arweave";

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
        onHide={confirmModalHide}
      >
        <Modal.Body>
          {mode === modes.confirm && (
            <FaTimes
              className="icon-close cursor"
              color={colors.blueDark}
              size={24}
              onClick={onClickCloseConfirmModal}
            />
          )}
          {mode === modes.confirm && (
            <h2 className="modal-title text-blue">Confirm transaction</h2>
          )}
          {mode === modes.uploading && (
            <h2 className="modal-title text-blue">
              Your NFTs are uploading...
            </h2>
          )}
          <div className="imgs-wrapper">
            <Space size={28}>
              {uploadContents.map((c, key) => (
                <Image
                  className="br-4"
                  src={c.thumb || ItemTemp}
                  width={40}
                  key={key}
                />
              ))}
            </Space>
          </div>
          {mode === modes.confirm && (
            <>
              <div className="modal-row mb-2">
                <div className="modal-row-left">
                  <p className="text-blue mb-0">
                    AR to upload: <b>0.0002 AR</b> / NFT{" "}
                  </p>
                </div>
                <div className="modal-row-right">
                  <p className="text-blue mb-0">
                    x {uploadContents.length} uploads
                  </p>
                </div>
              </div>
              <div className="modal-row mb-4">
                <div className="modal-row-left">
                  <p className="text-blue mb-0">
                    KOI to upload: <b>1.0 KOI</b> / NFT{" "}
                  </p>
                </div>
                <div className="modal-row-right">
                  <p className="text-blue mb-0">
                    x {uploadContents.length} uploads
                  </p>
                </div>
              </div>
              <h6 className="text-blue">
                <b>Estimated Total</b>
              </h6>
              <h6 className="text-blue">
                {show_fixed_number(uploadContents.length * 0.0002, 4)} AR
              </h6>
              <h6 className="text-blue">
                {show_fixed_number(uploadContents.length * 1, 1)} KOI
              </h6>
              <div className="text-center">
                {loading && (
                  <Spin size="large" tip="get KOI balance" />
                )}
              </div>
              {errMessage && <p className='text-center text-danger'>{errMessage}</p>}
              <Button
                className="btn-blueDark btn-connect"
                onClick={onConnectWallet}
              >
                Confirm & Upload
              </Button>
            </>
          )}
          {mode === modes.uploadKey && (
            <>
              <div className="upload-cards-wrapper">
                <SingleAntFileUpload>
                  <Dragger
                    name="file"
                    accept="application/*"
                    multiple={false}
                    listType="picture"
                    beforeUpload={beforeJsonUpload}
                    showUploadList={false}
                  >
                    <div className="uploader-container">
                      {uploading ? (
                        <Spin size="large" />
                      ) : (
                        <>
                          <div className="uploader-icon d-flex justify-content-center align-items-center">
                            <Image src={IconUpload} />
                          </div>
                          <p className="text-blue mb-0">
                            Drag & Drop your Arweave keyfile here.
                          </p>
                        </>
                      )}
                    </div>
                  </Dragger>
                </SingleAntFileUpload>
              </div>
            </>
          )}
          {mode === modes.uploading && (
            <>
              <div className="modal-row mb-2 text-center">
                <div className="modal-row-center custom-pd">
                  <p className="text-blue mb-0">
                    Don’t navigate away from this page or close your browser
                    tab. It can disrupt the uploading process.
                  </p>
                  <p className="text-blue mb-2">
                    Storing them forever should only take a few minutes.
                  </p>
                </div>
              </div>
              <h6 className="text-blue">
                <b>Loading</b>
              </h6>
              <Progress
                strokeColor={colors.blueDark}
                trailColor={colors.blueLight}
                percent={(updatingProcess * 100) / uploadContents.length}
                status="active"
                showInfo={false}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </TopbarContainer>
  );
}

export default Topbar;
