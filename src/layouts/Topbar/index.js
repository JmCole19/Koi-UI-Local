import {
  DefaultUser,
  Logo,
  IconEyes,
  IconFish,
  IconArweave,
} from "assets/images";
import React, { useRef, useState } from "react";
import { Navbar, Nav, Image, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TopbarContainer } from "./style";

function Topbar() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

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
          <Link to="#" className="btn-nav">
            OpenKoi
          </Link>
          <Image
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
          </Overlay>
        </Nav>
      </Navbar.Collapse>
    </TopbarContainer>
  );
}

export default Topbar;
