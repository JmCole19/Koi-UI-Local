/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Image } from "react-bootstrap";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import { IconEyes, IconFish, IconHtml, ItemTemp } from "assets/images";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  EmailShareButton,
} from "react-share";
import { FiTwitter, FiFacebook, FiMessageCircle } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LeaderboardItemContainer } from "./style";
import { colors } from "theme";
import { preUrl } from "config";
import { getMediaType, mediaExists, show_digit_number } from "service/utils";
import moment from "moment";

const video_contents = [
  'cfhKMEd_pCZHHIKeVGZAilnITonqllwkA_yhiF2PaOw',
  'HEcP1vyyHXjLVZ8ote2rphHq7wsvcVPr7RnMyAh2ZJE',
  '_gk1ZNumV6a0vuqhVr5v6w1RYfoi-pArn-JKpU5eWZU',
  'kpaWOQ6Uv8EdgG3acRwyijjTpRXDGF-w_VORPzG-3bQ'
]

function LeaderboardItem({
  item = {},
  order,
  onClickItem = () => {},
  onClickUsername = () => {},
  onClickShare = () => {},
  onClickEmbed = () => {},
}) {
  const shareTitle = `Check out my NFT, now stored on Koi— forever!`;
  const shareUrl = `${window.location.protocol}//${
    window.location.hostname
  }/content-detail/${item.txIdContent}?type=view&t=${Math.random() * 999999}`;
  const smsUrl = `sms:+19024021271&body=${shareTitle} ${window.location.protocol}//${window.location.hostname}/content-detail/${item.txIdContent}&type=view`;

  const show_content = (item) => {
    if(video_contents.includes(item.txIdContent) || getMediaType(item?.contentType) === 'video' ) {
      // video content
      let res = mediaExists(item.txIdContent)
      if(res){
        return (
          <ResponsiveEmbed aspectRatio="16by9" className="cursor" onClick={onClickItem}>
            <iframe title="embed_video" width="100%" height="400" src={`${preUrl}${item.txIdContent}`} frameBorder="0" allowFullScreen></iframe>
          </ResponsiveEmbed>)
      }else{
        return (<Image
          src={ItemTemp}
          onError={(ev => ev.target.src = ItemTemp)}
          className="cursor"
          onClick={onClickItem}
        />)
      }
    }else{
      return (
        <Image
          src={
            item.txIdContent && item.owner
              ? `${preUrl}${item.txIdContent}?t=${Math.random() * 999999}`
              : ItemTemp
          }
          onError={(ev => ev.target.src = ItemTemp)}
          className="cursor"
          onClick={onClickItem}
        />)
    }
  }

  return (
    <LeaderboardItemContainer>
      <div className="w20">
        <h3 className="item-order">{order + 1}</h3>
      </div>
      <div className="item-container">
        <div className="part-left">
          <div className="item-img-wrapper item-col">
            {show_content(item)}
          </div>
          <div className="item-info-wrapper item-col">
            <h2 className="item-title mb-1 cursor" onClick={onClickItem}>{item.name}</h2>
            <p className="item-username mb-3 cursor" onClick={onClickUsername}>
              {item.ticker}
            </p>
            <p className="item-created_at mb-0">
              Registered: {moment(item.created_at).format("MMM, DD, YYYY")}
            </p>
            <a
              href={`https://viewblock.io/arweave/tx/${item.txIdContent}`}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-block mb-0"
            >
              explore block
            </a>
          </div>
        </div>
        <div className="part-right">
          <div className="item-reviews-wrapper item-col">
            <h5 className="item-total_reviews mb-0">
              {show_digit_number(item.totalViews)}
              <span className="ml-2">
                <Image src={IconEyes} />
              </span>
            </h5>
            <h5 className="item-rewards mb-0">
              {show_digit_number(item.totalReward)}{" "}
              <span className="ml-1">
                <Image src={IconFish} width={18} />
              </span>
            </h5>
          </div>
          <div className="share-wrapper">
            <div className="btns-wrapper">
              <Button className="btn-share btn-blue" onClick={onClickShare}>
                Share
              </Button>
              <Button className="btn-html" onClick={onClickEmbed}>
                <Image src={IconHtml} />
              </Button>
            </div>
            <div className="social-wrapper">
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <FiTwitter size={24} color={colors.greenDark} />
              </TwitterShareButton>
              <InstapaperShareButton url={shareUrl} title={shareTitle}>
                <FaInstagram size={24} color={colors.greenDark} />
              </InstapaperShareButton>
              <FacebookShareButton className="sx-hidden-share" url={shareUrl} quote={shareTitle}>
                <FiFacebook size={24} color={colors.greenDark} />
              </FacebookShareButton>
              <a href={smsUrl} className="sx-hidden-share">
                <FiMessageCircle size={24} color={colors.greenDark} />
              </a>
              <EmailShareButton url={shareUrl} subject={shareTitle}>
                <HiOutlineMail size={24} color={colors.greenDark} />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </LeaderboardItemContainer>
  );
}

export default LeaderboardItem;
