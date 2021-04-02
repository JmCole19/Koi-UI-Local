/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Image } from "react-bootstrap";
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
import { show_digit_number } from "service/utils";
import moment from "moment";

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

  return (
    <LeaderboardItemContainer>
      <div className="part-left">
        <div className="item-col">
          <h3 className="item-order">{order + 1}</h3>
        </div>
        <div className="item-img-wrapper item-col">
          <Image
            src={
              item.txIdContent && item.owner
                ? `${preUrl}${item.txIdContent}?t=${Math.random() * 999999}`
                : ItemTemp
            }
            className="cursor"
            onClick={onClickItem}
          />
        </div>
        <div className="item-info-wrapper item-col">
          <h2 className="item-title mb-1">{item.ticker}</h2>
          <p className="item-username mb-3 cursor" onClick={onClickUsername}>
            {item.name}
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
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FiFacebook size={24} color={colors.greenDark} />
            </FacebookShareButton>
            <a href={smsUrl}>
              <FiMessageCircle size={24} color={colors.greenDark} />
            </a>
            <EmailShareButton url={shareUrl} subject={shareTitle}>
              <HiOutlineMail size={24} color={colors.greenDark} />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </LeaderboardItemContainer>
  );
}

export default LeaderboardItem;
