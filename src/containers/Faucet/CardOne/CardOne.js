import { Button } from "antd";
import React from "react";

export default function CardOne(props) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={props.clickedDownLoad}
        disabled={!props.disabled}
      >
        DOWNLOAD ARWEAVE WALLET
      </Button>
      <Button
        onClick={props.tweetButton}
        variant="contained"
        disabled={!props.disableTweet}
      >
        <a href={props.address} target="_blank" rel="noopener noreferrer">
          Open Tweet Pop-up
        </a>
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={props.clickRegister}
        disabled={!props.disable}
      >
        Get Koi
      </Button>
    </div>
  );
}
