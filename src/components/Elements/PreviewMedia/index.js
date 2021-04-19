/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconUpload } from "assets/images";
import { Image } from "react-bootstrap";
import { PreviewMediaContainer } from "./style";

function PreviewMedia({
    imageUrl = null,
    contentType = null
}) {
    let addClass = ''
    let mediaType = 'image'
    if(imageUrl){
        if(contentType.includes('image/')) {
            addClass = 'embed-image'
        }else if(contentType.includes('video/')){
            addClass = 'embed-video'
            mediaType = 'video'
        }else if(contentType.includes('audio/')){
            addClass = 'embed-audio'
            mediaType = 'audio'
        }
    }
  return (
    <PreviewMediaContainer className={addClass}>
        {imageUrl ? <Image src={imageUrl} /> : <Image src={IconUpload} />}
    </PreviewMediaContainer>
  );
}

export default PreviewMedia;