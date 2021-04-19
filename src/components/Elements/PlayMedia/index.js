/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconUpload } from "assets/images";
import { Image } from "react-bootstrap";
import { PlayMediaContainer } from "./style";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

function PlayMedia({
    imageUrl = null,
    contentType = null,
    addSubClass = ''
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
    // console.log({mediaType})
  return (
    <PlayMediaContainer className={addClass}>
        {mediaType === 'image' && (
            imageUrl ? <Image src={imageUrl} className={addSubClass} /> : <Image src={IconUpload} className={addSubClass} />)}
        {mediaType === 'video' && <ResponsiveEmbed aspectRatio="16by9" className="cursor">
          <iframe title="embed_video" width="100%" height="300" src={imageUrl} frameBorder="0" allowFullScreen></iframe>
        </ResponsiveEmbed>}
    </PlayMediaContainer>
  );
}

export default PlayMedia;