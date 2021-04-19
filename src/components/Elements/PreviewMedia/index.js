/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconUpload } from "assets/images";
import { Image } from "react-bootstrap";
import { PreviewMediaContainer } from "./style";

function PreviewMedia({
    imageUrl = null,
    contentType = 'image'
}) {
    let addClass = ''
    if(contentType === 'image') {
        addClass = imageUrl ? 'embed-image' : ''
    }else if(contentType === 'video'){
        addClass = imageUrl ? 'embed-video' : ''
    }
  return (
    <PreviewMediaContainer className={addClass}>
        {imageUrl ? <Image src={imageUrl} /> : <Image src={IconUpload} />}
    </PreviewMediaContainer>
  );
}

export default PreviewMedia;