/* eslint-disable react-hooks/exhaustive-deps */
import {
  IconArweave,
  IconEthereum,
  IconUpload,
  IconOpenSea,
} from "assets/images";
import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { RegisterContentContainer } from "./style";

const cards = [
  {
    img: IconOpenSea,
    title: "OpenSea",
    subtitle1: "Import OpenSea portfolio",
    link: "/opensea",
  },
  {
    img: IconEthereum,
    title: "Ethereum NFT ",
    subtitle1: "Enter a Token ID",
    link: "/upload/ethereum?step=1",
  },
  {
    img: IconArweave,
    title: "Arweave Content",
    subtitle1: "Enter an Arweave ID",
    link: "/upload/arweave?step=1",
  },
  {
    img: IconUpload,
    title: "Upload Manually",
    subtitle1: "Drag & Drop or",
    subtitle2: "Browse Computer",
    link: "/upload/manual?step=1",
  },
];

function RegisterContent() {
  const history = useHistory();

  return (
    <RegisterContentContainer>
      <Container>
        <div className="register-content-wrapper">
          <div className="register-content">
            <h1 className="text-blue register-title">Register your content.</h1>
            <h4 className="register-description">
              There are 3 ways to register on the Koi Network. Earn rewards
              today.
            </h4>
            <div className="register-cards">
              {cards.map((_card, _i) => (
                <div
                  className="register-card"
                  onClick={() => history.push(_card.link)}
                >
                  <div className="card-img">
                    <Image src={_card.img} />
                  </div>
                  <div className="card-content">
                    <h5>{_card.title}</h5>
                    <p className="mb-1">{_card.subtitle1}</p>
                    {_card.subtitle2 && (
                      <p className="mb-0">{_card.subtitle2}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="btn-back-wrapper">
              <Button
                className="btn-back btn-blueDark"
                onClick={() => history.push("/contents")}
              >
                Back to Leaderboard
              </Button>
            </div>
            <p className='bottom-description text-blue text-center'>Got a voucher? <Link to='#/'>Redeem an NFT voucher</Link> from Ethereum to claim your Atomic NFT.</p>
          </div>
        </div>
      </Container>
    </RegisterContentContainer>
  );
}

export default RegisterContent;
