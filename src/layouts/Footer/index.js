import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import customAxios from "service/customAxios";
import { show_notification, validEmail } from "service/utils";
import { FooterContainer } from "./style";

const items = [
  {
    header: "COMPANY",
    className: "col-lg-5 col-md-4 col-sm-6 company",
    child: [
      { name: "OpenKoi", link: "https://openkoi.com/", className: "normal" },
      { name: "Leaderboard", route: "/", className: "normal" },
      { name: "KOI Faucet", route: "/faucet", className: "normal" },
      { name: "Blog", link: "https://blog.openkoi.com/", className: "" },
      { name: "Developers", link: "https://docs.openkoi.com/", className: "" },
      {
        name: "Desktop App",
        link: "https://openkoi.com/downloads",
        className: "",
      },
      { name: "Support", link: "mailto:support@openkoi.com", className: "" },
      { name: "Careers", link: "mailto:jobs@openkoi.com", className: "" },
    ],
  },
  {
    header: "GET INVOLVED",
    className: "col-lg-4 col-md-4 col-sm-6 get-involved",
    child: [
      {
        name: "Upload content",
        route: "/register-content",
        className: "normal",
      },
      {
        name: "Run a node",
        link: "https://openkoi.com/downloads",
        className: "normal",
      },
      {
        name: "Get KOI",
        route: "/faucet",
        className: "normal",
      },
      {
        name: "Join the Discord",
        link: "https://discord.gg/dRsAJ6kAcP",
        className: "",
      },
      {
        name: "Follow us on Twitter",
        link: "https://twitter.com/open_koi",
        className: "",
      },
      {
        name: "Developer SDK",
        link: "https://www.npmjs.com/package/koi_tools",
        className: "",
      },
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

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [onList, setOnList] = useState(false);
  const onClickSubscribe = async () => {
    if(!email) {
      show_notification('Please input an email address')
      return false
    }else if(!validEmail(email)){
      show_notification('Please input valid email address')
      return false
    }else {
      setLoading(true)
      let { ok, data: {data} } = await customAxios.post(`/subscription`, {
        email,
      });
      if (ok) {
        setLoading(false)
        setEmail('')
        if(data.isExisting) {
          setOnList(true)
          show_notification('You\'re already on the list!', 'KOI', 'success')
        }else{
          setOnList(true)
          show_notification('Your email successfully added.', 'KOI', 'success')
        }
      } else {
        setLoading(false)
        let errMessage = data.message || 'There is an error.'
        show_notification(errMessage);
      }
    }
  }
  return (
    <FooterContainer className="w-100">
      <div className="container">
        <h2>Store forever. Earn forever.</h2>
        <h3 className="footer-description">
          Get rewarded for the best content on the web.
        </h3>
        <div className="row">
          <div className="col-sm-6">
            <h6 className="text-white">Stay up to date</h6>
            <p className="field-label">Email address</p>
            {onList ? <div className="email-list">
              <span className="lbl-email-list">
                You're on the list!
              </span>
            </div> :
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-group-btn">
                <button className="btn btn-orange" type="button" onClick={onClickSubscribe}>
                {loading ? <Spin size="small" style={{marginTop: 5}} /> : 'Sign up'}
                </button>
              </span>
            </div>
            }
          </div>
        </div>
        <div className="row footer-options-wrapper">
          {items.map((_item, _i) => (
            <div key={_i} className={`footer-option ${_item.className}`}>
              <h6 className="footer-option-title">{_item.header}</h6>
              <div className="footer-option-list">
                {_item.child.map((_child, _j) => (
                  <div key={_j} className="nav-item mb-1">
                    {_child.route && (
                      <Link
                        to={_child.route}
                        className={`nav-link ${_child.className}`}
                      >
                        {_child.name}
                      </Link>
                    )}
                    {_child.link && (
                      <a
                        className={`nav-link ${_child.className}`}
                        href={_child.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {_child.name}
                      </a>
                    )}
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
