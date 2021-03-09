/* eslint-disable react-hooks/exhaustive-deps */
import {
  IconArweave,
  IconEthereum,
  IconUpload,
  IconOpenSea,
} from "assets/images";
import React, { useContext, useEffect } from "react";
import Web3 from "web3";
import Arweave from 'arweave';
import { Button, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { RegisterContentContainer } from "./style";
import { abi } from "./abi";
import { DataContext } from "contexts/DataContextContainer";

const arweave = Arweave.init();
const cards = [
  {
    id: "opensea",
    img: IconOpenSea,
    title: "OpenSea",
    subtitle1: "Import OpenSea portfolio",
    link: "/opensea",
  },
  {
    id: "ethereum",
    img: IconEthereum,
    title: "Ethereum NFT ",
    subtitle1: "Enter a Token ID",
    link: "/upload/ethereum?step=1",
  },
  {
    id: "arweave",
    img: IconArweave,
    title: "Arweave Content",
    subtitle1: "Enter an Arweave ID",
    link: "/upload/arweave?step=1",
  },
  {
    id: "manual",
    img: IconUpload,
    title: "Upload Manually",
    subtitle1: "Drag & Drop or",
    subtitle2: "Browse Computer",
    link: "/upload/manual?step=1",
  },
];

function RegisterContent() {
  const history = useHistory();
  const { address, addressArweave, setAddress } = useContext(DataContext);

  const onClickCard = (card) => {
    if (card.id === "opensea") {
      openMetaMask();
    } else if (card.id === 'arweave') {
      if(addressArweave) {
        history.push(card.link);
      }else{
        openArConnect();
      }
    }
  };

  useEffect(() => {
    console.log("here1")
    // const arweave = Arweave.init();
    window.addEventListener("arweaveWalletLoaded", detectArweaveWallet(arweave));
    // window.addEventListener("walletSwitch", (e) => detectSwitchArweaveWallet(e));
    return () => {
      window.removeEventListener('arweaveWalletLoaded', detectArweaveWallet(arweave));
      // window.removeEventListener('walletSwitch',(e) => detectSwitchArweaveWallet(e));
    }
  }, []);

  const detectArweaveWallet = async () => {
    console.log(arweave)
    console.log(arweave.wallets)
    let addr = await arweave.wallets.getAddress();
    console.log("detected arweave wallet address : ", addr)
  }
  const detectSwitchArweaveWallet = async (e) => {
    console.log(e)
    let addr = "e.detail.address";
    console.log("detected switch arweave wallet address : ", addr)
  }

  const openArConnect = () => {
    console.log("ehre")
    // window.addEventListener("arweaveWalletLoaded", detectArweaveWallet);
    // window.addEventListener("walletSwitch", detectSwitchArweaveWallet);
    
  };
  const openMetaMask = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    window.ethereum.enable().then(function (accounts) {
      let contractInstance = new web3.eth.Contract(
        abi,
        "0x60F80121C31A0d46B5279700f9DF786054aa5eE5",
        { from: accounts[0] }
      );
      console.log("hello world");
      setAddress(accounts[0]);
      // let contentOwnerAddress = accounts[0];
      console.log(contractInstance);
      history.push(`/opensea?address=${accounts[0]}`);
    });
  };
  console.log({ address });
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
                  key={_i}
                  className="register-card cursor"
                  onClick={() => onClickCard(_card)}
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
            <p className="bottom-description text-blue text-center">
              Got a voucher? <Link to="#/">Redeem an NFT voucher</Link> from
              Ethereum to claim your Atomic NFT.
            </p>
          </div>
        </div>
      </Container>
    </RegisterContentContainer>
  );
}

export default RegisterContent;
