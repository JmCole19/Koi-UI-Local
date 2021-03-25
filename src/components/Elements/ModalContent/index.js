/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Image, Modal } from "react-bootstrap";
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

import { preUrl } from "config";

// const contents = [
//   {
//     balances: { "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU": 1 },
//     description:
//       "'The Delights of Purim' at the Israeli Opera, photo by Ziv Barak",
//     name: "Kayla",
//     owner: "sQTWslyCdKF6oeQ7xXUYUV1bluP0_5-483FXH_RVZKU",
//     ticker: "KRK",
//     totalReward: 0,
//     totalViews: 0,
//     twentyFourHrViews: 0,
//     txIdContent: "EKW3AApL4mdLc6sIhVr3Cn8VN7N9VAQUp2BNALHXFtQ",
//   },
// ];
// const description =
//   "José Delbo sent me his striking pencil sketch and powerful inked work, which I then interpreted in oil on canvas. I wanted to create a very painterly piece with obvious brush marks etc, but I was also aiming for a nostalgic feel, a kind of 1980’s superhero comic book look, the kind I grew up with. My goal with this animation was to try to recreate, in part, the creative process that both artists went through with the visual information I had. I was able to showcase my painting process more accurately as I could take photographs of my progress throughout. Consecutive images could then be layered like brush strokes over José’s drawing to create the impression that this was one continuous artwork from pencil, to ink, to completed painting. The representation of the line sketch at the beginning, then pencil/ink and lastly the paint layers being applied demonstrate both artists’ struggle for the right lines, tone, form, and colour until the work is finally completed. As the oil was still wet with each photograph the glare of my studio lights can be seen in the brush strokes. Eventually, the figure emerges and as it does, our hero comes to life, looking directly at the viewer -- but is he grimacing in approval or disgust? We will never know for sure as just before he can say anything, white paint is brushed across the canvas entirely and the process begins again. Only the bat is quick enough to escape.";

function ModalContent({
  type = "share",
  show = false,
  detail = {},
  onHide = () => {},
  onSwitchModal = () => {},
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentUrl = `${window.location.protocol}//${window.location.hostname}/content-detail/${detail.txIdContent}`;
  const embedUrl = `${window.location.protocol}//${window.location.hostname}/embed/${detail.txIdContent}`;
  const smsUrl = `sms://+19024021271?body=${window.location.protocol}//${window.location.hostname}/content-detail/${detail.txIdContent}?type=view`;
  // console.log(currentUrl)
  // console.log(embedUrl)
  const shareSocial = [
    {
      icon: (
        <TwitterShareButton url={currentUrl}>
          <FiTwitter size={24} color={colors.greenDark} />
        </TwitterShareButton>
      ),
      title: "twitter",
    },
    {
      icon: (
        <InstapaperShareButton url={currentUrl} title="KOI leaderboard">
          <FaInstagram size={24} color={colors.greenDark} />
        </InstapaperShareButton>
      ),
      title: "instagram",
    },
    {
      icon: (
        <FacebookShareButton url={currentUrl}>
          <FiFacebook size={24} color={colors.greenDark} />
        </FacebookShareButton>
      ),
      title: "facebook",
    },
    {
      icon: (
        <LinkedinShareButton url={currentUrl}>
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
        <EmailShareButton url={currentUrl}>
          <HiOutlineMail size={24} color={colors.greenDark} />
        </EmailShareButton>
      ),
      title: "email",
    },
    {
      icon: (
        <WhatsappShareButton url={currentUrl}>
          <FaWhatsapp size={24} color={colors.greenDark} />
        </WhatsappShareButton>
      ),
      title: "whatsapp",
    },
    {
      icon: (
        <TelegramShareButton url={currentUrl}>
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
    navigator.clipboard.writeText(embedUrl);
    setCopiedCode(true);
  };

  const hideModal = () => {
    setCopiedLink(false);
    onHide();
  };

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
          <h6 className="modal-description text-blue">
            Every time someone visits a site with your embedded NFTs, you’ll
            earn KOI.
          </h6>
        )}
        {type === "share" ? (
          <div className="content-wrapper content-share">
            <div className="modal-left">
              <Image src={`${preUrl}${detail.txIdContent}`} />
              <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
            </div>
            <div className="modal-right">
              <div className="part">
                <h6 className="part-title text-blue">Copy the link</h6>
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
              <Image src={`${preUrl}${detail.txIdContent}`} />
              <h6 className="text-blue mb-0 text-bold">{detail.name}</h6>
            </div>
            <div className="modal-right">
              <div className="part">
                <h6 className="part-title text-blue">Copy the snippet</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={embedUrl}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-blueDark"
                      type="button"
                      onClick={onCopyCode}
                    >
                      Copy Code
                    </button>
                  </span>
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
