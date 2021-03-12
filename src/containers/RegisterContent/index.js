/* eslint-disable react-hooks/exhaustive-deps */
import {
  IconArweave,
  IconEthereum,
  IconUpload,
  IconOpenSea,
} from "assets/images";
import React, { useContext } from "react";
import Web3 from "web3";
// import Arweave from "arweave";
import { Button, Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { RegisterContentContainer } from "./style";
import { abi } from "./abi";
import { DataContext } from "contexts/DataContextContainer";
import { show_notification } from "service/utils";
import { notification } from "antd";

// const arweave = Arweave.init();
const cards = [
  {
    id: "opensea",
    img: IconOpenSea,
    title: "OpenSea",
    subtitle1: "Import OpenSea portfolio",
    link: "/opensea",
    comingSoon: false
  },
  {
    id: "ethereum",
    img: IconEthereum,
    title: "Ethereum NFT ",
    subtitle1: "Enter a Token ID",
    link: "/upload/ethereum?step=1",
    comingSoon: true
  },
  {
    id: "arweave",
    img: IconArweave,
    title: "Arweave Content",
    subtitle1: "Enter an Arweave ID",
    link: "/upload/arweave?step=1",
    comingSoon: true
  },
  {
    id: "manual",
    img: IconUpload,
    title: "Upload Manually",
    subtitle1: "Drag & Drop or",
    subtitle2: "Browse Computer",
    link: "/upload/manual?step=1",
    comingSoon: false
  },
];

function RegisterContent() {
  const history = useHistory();
  const {
    addressEth,
    setAddressEth,
    // addressArweave,
    // setAddressArweave,
  } = useContext(DataContext);
  // const [detectorAr, setDetectorAr] = useState(false);

  const onClickCard = (card) => {
    if (card.id === "opensea") {
      openMetaMask(card.id);
    } else if (card.id === "arweave") {
      history.push(card.link);
      // if (addressArweave) {
      //   history.push(card.link);
      // } else {
      //   setDetectorAr(true);
      // }
    } else {
      history.push(card.link);
    }
  };

  // useEffect(() => {
  //   if (detectorAr) {
  //     // console.log("here2 ", detectorAr)
  //     window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
  //     window.addEventListener("walletSwitch", (e) =>
  //       detectSwitchArweaveWallet(e)
  //     );
  //     return () => {
  //       window.removeEventListener(
  //         "arweaveWalletLoaded",
  //         detectArweaveWallet()
  //       );
  //       window.removeEventListener("walletSwitch", (e) =>
  //         detectSwitchArweaveWallet(e)
  //       );
  //     };
  //   }
  // }, [detectorAr]);

  // const detectArweaveWallet = async () => {
  //   try {
  //     let addr = await arweave.wallets.getAddress();
  //     console.log("detected arweave wallet address : ", addr);
  //     if (addr) {
  //       setAddressArweave(addr);
  //       history.push(`/upload/arweave?step=1`);
  //     } else {
  //       history.push(`/upload/arweave?step=1`);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     history.push(`/upload/arweave?step=1`);
  //   }
  // };

  // const detectSwitchArweaveWallet = async (e) => {
  //   console.log(e);
  //   // let addr = "e.detail.address";
  //   // console.log("detected switch arweave wallet address : ", addr)
  // };

  const openMetaMask = (card_type) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if(window.ethereum) {

      window.ethereum.enable().then(function (accounts) {
        setAddressEth(accounts[0]);
        if (card_type === "opensea") {
          let contractInstance = new web3.eth.Contract(
            abi,
            "0x60F80121C31A0d46B5279700f9DF786054aa5eE5",
            { from: accounts[0] }
          );
          console.log("hello world");
          console.log(contractInstance);
          history.push(`/opensea?address=${accounts[0]}`);
        } else {
          notification.success({
            message: "Success",
            description: "Set Ethereum address successfully!",
            placement: "topRight",
            onClick: () => {
              console.log("Notification Clicked!");
            },
            onClose: () => {
              history.push(`/contents`);
            },
          });
        }
        // let contentOwnerAddress = accounts[0];
      });
    }else{
      // metamask extension didn't install
      show_notification("Please install metamask extension first.", "KOI");
      setTimeout(() => {
        let url = 'https://metamask.io/download.html'
        window.open(url, "_blank")
      }, 2000)
    }
  };
  console.log({ address: addressEth });
  return (
    <RegisterContentContainer>
      <Container>
        <div className="register-content-wrapper">
          <div className="register-content">
            <h1 className="text-blue register-title">Register your content.</h1>
            <h4 className="register-description">
              There are 3 ways to register on the Koi Network. Earn rewards today.
            </h4>
            <div className="register-cards">
              {cards.map((_card, _i) => (
                <div
                  key={_i}
                  className={`register-card cursor ${_card.comingSoon ? 'disable' : ''}`}
                  onClick={() => !_card.comingSoon && onClickCard(_card)}
                >
                  {_card.comingSoon && <div className="coming-soon">Coming soon</div>}
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
