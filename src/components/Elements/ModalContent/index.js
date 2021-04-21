/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import { ItemTemp } from "assets/images";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import {
  FaInstagram,
  FaTelegramPlane,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiFacebook,
  FiLinkedin,
  FiMessageCircle,
  FiTwitter,
} from "react-icons/fi";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { IoLogoTiktok } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { colors } from "theme";

import { preUrl, arweaveUrl } from "config";
import { getMediaType } from "service/utils";

const video_contents = [
  'cfhKMEd_pCZHHIKeVGZAilnITonqllwkA_yhiF2PaOw',
  'HEcP1vyyHXjLVZ8ote2rphHq7wsvcVPr7RnMyAh2ZJE',
  '_gk1ZNumV6a0vuqhVr5v6w1RYfoi-pArn-JKpU5eWZU',
  'kpaWOQ6Uv8EdgG3acRwyijjTpRXDGF-w_VORPzG-3bQ'
]

function ModalContent({
  type = "share",
  show = false,
  detail = {},
  onHide = () => {},
  onSwitchModal = () => {},
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const shareTitle = `Check out my NFT, now stored on Koi— forever!`;
  const currentUrl = `${window.location.protocol}//${window.location.hostname}/content-detail/${detail.txIdContent}?t=${Math.random()*999999}`;
  const embedUrl = `${window.location.protocol}//${window.location.hostname}/embed/${detail.txIdContent}?t=${Math.random()*999999}`;
  const embedContent = `<iframe width="100%" src="${embedUrl}" title="Koi NFT image" frameborder="0" allowfullscreen></iframe>`;
  const smsUrl = `sms:+19024021271&body=${shareTitle} ${window.location.protocol}//${window.location.hostname}/content-detail/${detail.txIdContent}&type=view`;
  // console.log(currentUrl)
  // console.log(embedUrl)
  const shareSocial = [
    {
      icon: (
        <TwitterShareButton url={currentUrl} title={shareTitle}>
          <FiTwitter size={24} color={colors.greenDark} />
        </TwitterShareButton>
      ),
      title: "twitter",
    },
    {
      icon: (
        <InstapaperShareButton url={currentUrl} title={shareTitle}>
          <FaInstagram size={24} color={colors.greenDark} />
        </InstapaperShareButton>
      ),
      title: "instagram",
    },
    {
      icon: (
        <FacebookShareButton url={currentUrl} quote={shareTitle}>
          <FiFacebook size={24} color={colors.greenDark} />
        </FacebookShareButton>
      ),
      title: "facebook",
    },
    {
      icon: (
        <LinkedinShareButton url={currentUrl} title={shareTitle}>
          <FiLinkedin size={24} color={colors.greenDark} />
        </LinkedinShareButton>
      ),
      title: "linkedin",
    },
    {
      icon: <IoLogoTiktok size={24} color={colors.greenDark} />,
      title: "tiktok",
    },
  ];
  const shareDirect = [
    {
      icon: <a href={smsUrl}><FiMessageCircle size={24} color={colors.greenDark} /></a>,
      title: "text",
    },
    {
      icon: (
        <EmailShareButton url={currentUrl} subject={shareTitle}>
          <HiOutlineMail size={24} color={colors.greenDark} />
        </EmailShareButton>
      ),
      title: "email",
    },
    {
      icon: (
        <WhatsappShareButton url={currentUrl} title={shareTitle}>
          <FaWhatsapp size={24} color={colors.greenDark} />
        </WhatsappShareButton>
      ),
      title: "whatsapp",
    },
    {
      icon: (
        <TelegramShareButton url={currentUrl} title={shareTitle}>
          <FaTelegramPlane size={24} color={colors.greenDark} />
        </TelegramShareButton>
      ),
      title: "telegram",
    },
  ];
  const onCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
  };
  const onCopyCode = () => {
    navigator.clipboard.writeText(embedContent);
    setCopiedCode(true);
  };

  const hideModal = () => {
    setCopiedLink(false);
    onHide();
  };

  const show_content = (item) => {
    if(video_contents.includes(item.txIdContent) || getMediaType(item?.contentType) === 'video' ) {
      // video content
      let res = true //mediaExists(item.txIdContent)
      if(res){
        return (
          <ResponsiveEmbed aspectRatio="16by9" className="cursor">
            <iframe title="embed_video" width="100%" height="400" src={`${arweaveUrl}${item.txIdContent}`} frameBorder="0" allowFullScreen></iframe>
          </ResponsiveEmbed>)
      }else{
        return (<Image
          src={ItemTemp}
          onError={(ev => ev.target.src = ItemTemp)}
          className="detail-img"
        />)
      }
    }else{
      return (
        <Image
          src={`${preUrl}${item.txIdContent}?t=${
            Math.random() * 999999
          }`}
          onError={(ev => ev.target.src = ItemTemp)}
          className="detail-img"
        />)
    }
  }

  useEffect(() => {
    if (copiedLink || copiedCode) {
      const timer = setTimeout(() => {
        copiedLink && setCopiedLink(false);
        copiedCode && setCopiedCode(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [copiedLink, copiedCode]);

  return (
    <Modal show={show} onHide={hideModal} dialogClassName="modal-share">
      <Modal.Body>
        <FaTimes
          className="icon-close cursor"
          color={colors.blueDark}
          size={24}
          onClick={hideModal}
        />
        <h2 className="modal-title text-blue">
          {type === "share"
            ? "Share to earn more rewards"
            : "Embed your NFT to earn more."}
        </h2>
        {type === "embed" && (
          <h6 className="modal-description text-blue mb-3">
            Every time someone visits a site with your embedded NFTs, you’ll earn KOI.
          </h6>
        )}
        {type === "share" ? (
          <div className="content-wrapper content-share">
            <div className="modal-left">
              {show_content(detail)}
              <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
            </div>
            <div className="modal-right">
              <div className="part">
                <h6 className="modal-description text-blue mb-0">Copy the link</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentUrl}
                    placeholder="koi.rocks/genesis_1857746"
                    disabled
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-blueDark"
                      type="button"
                      onClick={onCopyLink}
                    >
                      Copy Link
                    </button>
                  </span>
                  {copiedLink && (
                    <div className="copied-message">Link copied!</div>
                  )}
                </div>
              </div>
              <div className="part">
                <h6 className="part-title text-blue">Share on social</h6>
                <div className="share-social">
                  {shareSocial.map((_social, _i) => (
                    <div key={_i} className="icon-share">
                      {_social.icon}
                      <p className="text-blue">{_social.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="part">
                <h6 className="part-title text-blue">Share directly</h6>
                <div className="share-direct">
                  {shareDirect.map((_direct, _i) => (
                    <div key={_i} className="icon-share">
                      {_direct.icon}
                      <p className="text-blue">{_direct.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="content-wrapper content-embed">
            <div className="modal-left">
              {show_content(detail)}
              <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
            </div>
            <div className="modal-right">
              <div className="part">
                <h6 className="modal-description text-blue mb-0">Copy the snippet</h6>
                <div className="">
                  <textarea disabled
                    className="form-control height-130"
                  >{embedContent}</textarea>
                  <div className="input-group-btn mt-1">
                    <button
                      className="btn btn-blueDark"
                      type="button"
                      onClick={onCopyCode}
                    >
                      Copy Code
                    </button>
                  </div>
                  {copiedCode && (
                    <div className="copied-message">Code snippet copied!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {type === "share" ? (
          <p className="text-blue footer-title">
            or <b onClick={onSwitchModal}>embed it</b> on a website
          </p>
        ) : (
          <p className="text-blue footer-title">
            or <b onClick={onSwitchModal}>share it</b> with friends
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalContent;
