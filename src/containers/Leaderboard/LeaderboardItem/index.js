/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Image } from "react-bootstrap";
import { ItemTemp, Logo } from "assets/images";
import { LeaderboardItemContainer } from "./style";

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
            {item.total_reviews} total views
          </h5>
          <h5 className="item-rewards mb-0">
            {item.rewards}{" "}
            <span>
              <Image src={Logo} width={30} />
            </span>{" "}
            rewards
          </h5>
        </div>
      </div>
    </LeaderboardItemContainer>
  );
}

export default LeaderboardItem;
