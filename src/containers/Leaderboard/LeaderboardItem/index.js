/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Image } from "react-bootstrap";
import { IconEyes, IconFish, IconHtml, ItemTemp } from "assets/images";
import { FiTwitter, FiFacebook, FiMessageCircle } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LeaderboardItemContainer } from "./style";
import { colors } from "theme";

function LeaderboardItem({
  item = {},
  order,
  onClickItem = () => {},
  onClickUsername = () => {},
  onClickShare = () => {},
  onClickEmbed = () => {},
}) {
  return (
    <LeaderboardItemContainer>
      <div className="part-left">
        <div className="item-col">
          <h3 className="item-order">{order + 1}</h3>
        </div>
        <div className="item-img-wrapper item-col">
          <Image src={ItemTemp} className="cursor" onClick={onClickItem} />
        </div>
        <div className="item-info-wrapper item-col">
          <h2 className="item-title mb-1">{item.title}</h2>
          <p className="item-username mb-3 cursor" onClick={onClickUsername}>
            {item.username}
          </p>
          <p className="item-created_at mb-0">Registered: {item.created_at}</p>
          <a
            href="https://viewblock.io/"
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
            {item.total_reviews}
            <span className="ml-2">
              <Image src={IconEyes} />
            </span>
          </h5>
          <h5 className="item-rewards mb-0">
            {item.rewards}{" "}
            <span className="ml-1">
              <Image src={IconFish} />
            </span>
          </h5>
        </div>
        <div className="btns-wrapper">
          <Button className="btn-share btn-blue" onClick={onClickShare}>
            Share
          </Button>
          <Button className="btn-html" onClick={onClickEmbed}>
            <Image src={IconHtml} />
          </Button>
        </div>
        <div className="social-wrapper">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiTwitter size={24} color={colors.greenDark} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} color={colors.greenDark} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiFacebook size={24} color={colors.greenDark} />
          </a>
          <a href="sms:">
            <FiMessageCircle size={24} color={colors.greenDark} />
          </a>
          <a href="mailto:itsimpledeveloper@gmail.com">
            <HiOutlineMail size={24} color={colors.greenDark} />
          </a>
        </div>
      </div>
    </LeaderboardItemContainer>
  );
}

export default LeaderboardItem;
