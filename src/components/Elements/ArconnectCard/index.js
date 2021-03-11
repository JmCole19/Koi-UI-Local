/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconArConnect } from "assets/images";
import { Image } from "react-bootstrap";
import { ArconnectCardContainer } from "./style";

function ArconnectCard({
    openArConnect = () => {}
}) {
  return (
    <ArconnectCardContainer onClick={openArConnect}>
        <div className='card-icon'>
            <Image src={IconArConnect} />
        </div>
        <p className="text-blue text-center mb-0">Click here to open ArConnect browser extension. </p>
    </ArconnectCardContainer>
  );
}

export default ArconnectCard;