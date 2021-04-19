/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconArConnect } from "assets/images";
import { Image } from "react-bootstrap";
import { PreviewMediaContainer } from "./style";

function PreviewMedia({
    openArConnect = () => {}
}) {
  return (
    <PreviewMediaContainer onClick={openArConnect}>
        <div className='card-icon'>
            <Image src={IconArConnect} />
        </div>
        <p className="text-blue text-center mb-0">Click here to open ArConnect browser extension. </p>
    </PreviewMediaContainer>
  );
}

export default PreviewMedia;