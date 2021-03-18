import { Space } from "antd";
import { Logo, IconArweave, IconEthereum, IconFish, IconEyes } from "assets/images";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Navbar, Nav, Image, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { TopbarContainer } from "./style";
import { show_notification } from "service/utils";
import Arweave from "arweave";

const arweave = Arweave.init();

function Topbar() {
  
  const { walletKoi, walletAr, addressArweave, setAddressArweave } = useContext(DataContext);
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const [detectorAr, setDetectorAr] = useState(false);

  const activeArweave = () => {
    setDetectorAr(true)
  }

  const activeEthereum = () => {

  }

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
      console.log("here4")
      let addr = await arweave.wallets.getAddress();
      console.log("detected arweave wallet address : ", addr);
      if (addr) {
        setAddressArweave(addr);
      } else {
        // show alert
        show_notification('There is a problem to get your arwallet address. Please install arconnect extension and try again.')
      }
    } catch (err) {
      // console.log(err);
      show_notification('Error on detectomg Arweave wallet address')
    }
  };

  return (
    <TopbarContainer collapseOnSelect expand="md" fixed="top">
      <Link to="/" className="navbar-brand">
        <Image src={Logo} />
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
          {walletKoi === null ?
            <Space size={12} className="btns-connect">
              <p className="text-blue mb-0 text-bold">Connect Wallet</p>
              <Image onClick={activeArweave} src={IconArweave} className="cursor" width={18} />
              <Image onClick={activeEthereum} src={IconEthereum} className="cursor" width={18} />
            </Space>
            :
            <Space size={12} className="btns-connect">
              <span className="text-blue mb-0 text-bold">0.00</span>
              <Image ref={target} onClick={() => setShow(!show)} src={IconFish} className="cursor" width={18} />
              <span className="text-blue mb-0 text-bold">0.00</span>
              <Image ref={target} onClick={() => setShow(!show)} src={IconEyes} className="cursor" width={18} />
            </Space>
          }
          {/* <Image
            src={DefaultUser}
            ref={target}
            className="icon-user d-none d-md-flex cursor"
            onClick={() => setShow(!show)}
          />*/}
          <Overlay target={target.current} show={show} onHide={()=>setShow(false)} placement="bottom-end" rootClose>
            {(props) => (
              <Tooltip
                id="overlay-nav"
                {...props}
                arrowProps={{ style: { display: "none" } }}
              >
                <div className="overlay-header">
                  <p className="text-left text-bold">See my content</p>
                </div>
                <div className="overlay-body">
                  <div className="overlay-body-row">
                    <p className="text-bold">Account summary</p>
                  </div>
                  <div className="overlay-body-row">
                    <p>Total views</p>
                    <p className="overlay-value">7,124</p>
                    <Image src={IconEyes} className="ml-2" />
                  </div>
                  <div className="overlay-body-row">
                    <p>KOI balance </p>
                    <p className="overlay-value">2,106.58</p>
                    <Image src={IconFish} className="ml-2" />
                  </div>
                  <div className="overlay-body-row">
                    <p>AR balance </p>
                    <p className="overlay-value">47.21</p>
                    <Image src={IconArweave} className="ml-2" />
                  </div>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </Nav>
      </Navbar.Collapse>
    </TopbarContainer>
  );
}

export default Topbar;
