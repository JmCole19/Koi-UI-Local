import { Logo } from "assets/images";
import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TopbarContainer } from "./style";

function Topbar() {
  return (
    <TopbarContainer collapseOnSelect expand="md" fixed="top">
      <Navbar.Brand href="/">
        <Image src={Logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <i className="fas fa-bars"></i>
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/faucet">Faucet</Link>
          <Link to="#" className='btn-openkoi'>OpenKoi</Link>
        </Nav>
      </Navbar.Collapse>
    </TopbarContainer>
  );
}

export default Topbar;
