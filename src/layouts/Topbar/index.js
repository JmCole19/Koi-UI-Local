import { Space } from "antd";
import { Logo, IconArweave, IconEthereum } from "assets/images";
import React, { useContext } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "contexts/DataContextContainer";
import { TopbarContainer } from "./style";

function Topbar() {
  
  const { addressArweave, setAddressArweave } = useContext(DataContext);

  const activeArweave = () => {
    
  }

  const activeEthereum = () => {

  }

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
          <Space size={12} className="btns-connect">
            <p className="text-blue mb-0 text-bold">Connect Wallet</p>
            <Image onClick={activeArweave} src={IconArweave} className="cursor" width={18} />
            <Image onClick={activeEthereum} src={IconEthereum} className="cursor" width={18} />
          </Space>
          {/* <Image
            src={DefaultUser}
            ref={target}
            className="icon-user d-none d-md-flex cursor"
            onClick={() => setShow(!show)}
          />
          <Overlay target={target.current} show={show} placement="bottom-end">
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
          </Overlay> */}
        </Nav>
      </Navbar.Collapse>
    </TopbarContainer>
  );
}

export default Topbar;
