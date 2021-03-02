import React from "react";
import { FooterContainer } from "./style";

const items = [
  {
    header: "COMPANY",
    className: "col-lg-5 col-md-4 col-sm-6 company",
    child: [
      { name: "Home", link: "/", className: "normal" },
      { name: "Blog", link: "https://blog.openkoi.com/", className: "normal" },
      { name: "Help Us", link: "/koi", className: "normal" },
      { name: "Services", link: "/services", className: "" },
      { name: "Developers", link: "https://docs.openkoi.com/", className: "" },
      { name: "Desktop App", link: "/downloads", className: "" },
      { name: "Support", link: "mailto:support@openkoi.com", className: "" },
      { name: "Careers", link: "mailto:jobs@openkoi.com", className: "" },
    ],
  },
  {
    header: "GET INVOLVED",
    className: "col-lg-4 col-md-4 col-sm-6 get-involved",
    child: [
      { name: "Run a node", link: "/downloads", className: "normal" },
      {
        name: "Purchase",
        link: "mailto:sales@openkoi.com",
        className: "normal",
      },
      {
        name: "Earn for Code",
        link: "https://discord.gg/dRsAJ6kAcP",
        className: "normal",
      },
      {
        name: "Join the Discord",
        link: "https://discord.gg/dRsAJ6kAcP",
        className: "",
      },
      { name: "Whitepaper", link: "https://docs.openkoi.com/", className: "" },
    ],
  },
  {
    header: "GET IN TOUCH",
    className: "col-lg-3 col-md-4 col-sm-6 get-in-touch",
    child: [
      {
        name: "hello@openkoi.com",
        link: "mailto:hello@openkoi.com",
        className: "normal",
      },
      {
        name: "sales@openkoi.com",
        link: "mailto:sales@openkoi.com",
        className: "normal",
      },
      {
        name: "developer@openkoi.com",
        link: "mailto:developers@openkoi.com",
        className: "normal",
      },
      {
        name: "jobs@openkoi.com",
        link: "mailto:jobs@openkoi.com",
        className: "",
      },
      {
        name: "press@openkoi.com",
        link: "mailto:press@openkoi.com",
        className: "",
      },
    ],
  },
];
function Footer() {
  return (
    <FooterContainer className="w-100">
      <div className="container">
        <h2>Run a node.</h2>
        <h3 className="footer-description">
          Join the network, and help us preserve the best of human knowledge.
        </h3>
        <div className="row">
          <div className="col-sm-6">
            <h6 className="text-white">Stay up to date</h6>
            <p className="field-label">Email address</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <span className="input-group-btn">
                <button className="btn btn-orange" type="button">
                  Sign up
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="row footer-options-wrapper">
          {items.map((_item, _i) => (
            <div key={_i} className={`footer-option ${_item.className}`}>
              <h6 className="footer-option-title">{_item.header}</h6>
              <div className="footer-option-list">
                {_item.child.map((_child, _j) => (
                  <div key={_j} className="nav-item mb-1">
                    <a className={`nav-link ${_child.className}`} href="#/">
                      {_child.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mb-0">©KOI Co. 2021</p>
    </FooterContainer>
  );
}

export default Footer;
