/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Image } from "react-bootstrap";
import { IconEyes, IconFish, IconHtml, ItemTemp } from "assets/images";
import { FiTwitter, FiFacebook, FiMessageCircle } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LeaderboardItemContainer } from "./style";
import { colors } from "theme";

function LeaderboardItem({ item = {}, order, onClickItem = () => {} }) {
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
          <p className="item-username mb-3">{item.username}</p>
          <p className="item-created_at mb-0">Created: {item.created_at}</p>
        </div>
      </div>
      <div className="part-right">
        <div className="item-reviews-wrapper item-col">
          <h5 className="item-total_reviews mb-0">
            {item.total_reviews}
            <span className='ml-2'>
              <Image src={IconEyes} />
            </span>
          </h5>
          <h5 className="item-rewards mb-0">
            {item.rewards}{" "}
            <span className='ml-1'>
              <Image src={IconFish} />
            </span>
          </h5>
        </div>
        <div className="btns-wrapper">
          <Button className="btn-share btn-blue">Share</Button>
          <Button className="btn-html">
            <Image src={IconHtml} />
          </Button>
        </div>
        <div className="social-wrapper">
          <FiTwitter size={24} color={colors.greenDark} />
          <FaInstagram size={24} color={colors.greenDark} />
          <FiFacebook size={24} color={colors.greenDark} />
          <FiMessageCircle size={24} color={colors.greenDark} />
          <HiOutlineMail size={24} color={colors.greenDark} />
        </div>
      </div>
    </LeaderboardItemContainer>
  );
}

export default LeaderboardItem;
