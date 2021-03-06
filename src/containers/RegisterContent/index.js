/* eslint-disable react-hooks/exhaustive-deps */
import {
  IconArweave,
  IconEthereum,
  IconUpload,
  IconOpenSea,
} from "assets/images";
import React, { useContext, useState } from "react";
import Web3 from "web3";
// import Arweave from "arweave";
import { Button, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RegisterContentContainer } from "./style";
import { abi } from "assets/abi";
import { DataContext } from "contexts/DataContextContainer";
import { convertArBalance, show_notification } from "service/utils";
import { Col, Row, Spin } from "antd";
import AlertArea from "components/Sections/AlertArea";
import customAxios from "service/customAxios";
import { getKoi } from "service/KOI";
import { alertTimeout } from "config";
import MetaWrapper from "components/Wrappers/MetaWrapper";

const cards = [
  {
    id: "opensea",
    img: IconOpenSea,
    title: "OpenSea",
    subtitle1: "Import OpenSea portfolio",
    link: "/opensea",
    comingSoon: false,
  },
  {
    id: "ethereum",
    img: IconEthereum,
    title: "Ethereum NFT ",
    subtitle1: "Enter a Token ID",
    link: "/upload/ethereum?step=1",
    comingSoon: true,
  },
  {
    id: "arweave",
    img: IconArweave,
    title: "Arweave Content",
    subtitle1: "Enter an Arweave ID",
    link: "/upload/arweave?step=1",
    comingSoon: false,
  },
  {
    id: "manual",
    img: IconUpload,
    title: "Upload Manually",
    subtitle1: "Drag & Drop or",
    subtitle2: "Browse Computer",
    link: "/upload/manual?step=1",
    comingSoon: false,
  },
];

function RegisterContent() {
  const history = useHistory();
  const {
    addressAr,
    keyAr,
    setAddressEth,
    setBalanceKoi,
    setBalanceAr,
  } = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [errEmessage, setErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [detectorAr, setDetectorAr] = useState(false);

  const show_alert = (message = '', type = 'danger') => {
    setShowAlert(true)
    setAlertVariant(type)
    setErrMessage(message)
    setTimeout( () => {
      setShowAlert(false)
      setErrMessage('')
    }, alertTimeout)
  }

  const onClickCard = (card) => {
    if (card.id === "opensea") {
      openMetaMask(card.id);
    } else if (card.id === "arweave") {
      history.push(card.link);
    } else {
      history.push(card.link);
    }
  };

  const rewardAddingEth = async (address = '') => {
    if(!address) {
      show_alert('There is an error to detecting Ethereum address form Metamask. Please check metamask extension again.')
      return false
    }
    try{
      setLoading(true)
      let { ok, data: {data} } = await customAxios.post(`/addEthAddress`, {
        address, targetAddress: addressAr
      });
      console.log({data})
      if (ok) {
        show_alert(data.message, 'success')
        let balance = await getKoi(keyAr)
        setLoading(false)
        setBalanceKoi(Number(balance.koiBalance))
        setBalanceAr(convertArBalance(balance.arBalance))
        // show_alert('You???ll earn 3 KOI until 3 minutes.', 'success')
      } else {
        setLoading(false)
        show_alert("There was an error adding KOI to your wallet.");
      }
    }catch(err) {
      setLoading(false)
      show_notification(err.message);
    }
    
  };

  const openMetaMask = (card_type) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (window.ethereum) {
      window.ethereum.enable().then( async (accounts) => {
        setAddressEth(accounts[0]);
        if (card_type === "opensea") {
          let contractInstance = new web3.eth.Contract(
            abi,
            "0x60F80121C31A0d46B5279700f9DF786054aa5eE5",
            { from: accounts[0] }
          );
          console.log(contractInstance);
          history.push(`/opensea?address=${accounts[0]}`);
        } else if (card_type === "redeem") {
          console.log("contractInstance");
          console.log(accounts[0]);
          show_alert('Detect ethereum address successfully.', 'success')
          await rewardAddingEth(accounts[0])
        } else {
          show_notification("Set Ethereum address successfully!", 'KOI', 'success')
        }
      });
    } else {
      // metamask extension didn't install
      show_notification("Please install metamask extension first.", "KOI");
      setTimeout(() => {
        let url = "https://metamask.io/download.html";
        window.open(url, "_blank");
      }, 2000);
    }
  };
  const onRedeemVoucher = () => {
    if(!keyAr) {
      console.log("here")
      // setDetectorAr(true);
    }else{
      openMetaMask("redeem");
    }
  };

  // useEffect(() => {
  //   if (detectorAr) {
  //     window.addEventListener("arweaveWalletLoaded", detectArweaveWallet());
  //     return () => {
  //       window.removeEventListener("arweaveWalletLoaded", () => {});
  //     };
  //   }
  // }, [detectorAr]);

  // const detectArweaveWallet = async () => {
  //   try {
  //     let addr = await arweave.wallets.getAddress();
  //     console.log("detected arweave wallet address : ", addr);
  //     if (addr) {
  //       setAddressAr(addr);
  //       if(keyAr)
  //         openMetaMask("redeem");
  //       else{
  //         show_alert(
  //           "There was a problem retrieving your ARwallet balance. Please upload your Arweave key."
  //         );
  //         show_notification("There was a problem retrieving your arwallet balance. Please upload your Arweave key.")
  //         setTimeout( () => {
  //           history.push("/wallet-key");
  //         }, 4000)  
  //       }
  //     } else {
  //       // show alert
  //       show_alert("There was an error detecting your Arweave wallet address.");
  //       setTimeout( () => {
  //         history.push("/wallet-key");
  //       }, 4000)  
  //     }
  //   } catch (err) {
  //     // console.log(err);
  //     show_alert("There was an error detecting your Arweave wallet address.");
  //     setTimeout( () => {
  //       history.push("/wallet-key");
  //     }, 4000)  
  //   }
  // };
  
  return (
    <MetaWrapper>
      <AlertArea
        showMessage={showAlert}
        variant={alertVariant}
        message={errEmessage}
      ></AlertArea>
      <RegisterContentContainer>
        <Container>
          <div className="register-content-wrapper">
            <div className="register-content">
              <h1 className="text-blue register-title">Register your content.</h1>
              <h4 className="register-description">
                There are 4 ways to register on the Koi Network. Earn rewards
                today.
              </h4>
              <Row
                className="register-cards"
                justify="space-between"
                gutter={[
                  { xs: 15, sm: 15, lg: 55 },
                  { sm: 15, lg: 0 },
                ]}
              >
                {cards.map((_card, _i) => (
                  <Col xs={12} lg={6} key={_i}>
                    <div
                      key={_i}
                      className={`register-card cursor ${
                        _card.comingSoon ? "disable" : ""
                      }`}
                      onClick={() => !_card.comingSoon && onClickCard(_card)}
                    >
                      {_card.comingSoon && (
                        <div className="coming-soon">Coming soon</div>
                      )}
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
                  </Col>
                ))}
              </Row>
              <div className="btn-back-wrapper">
                <Button
                  className="btn-back btn-blueDark"
                  onClick={() => history.push("/contents")}
                >
                  Back to Leaderboard
                </Button>
              </div>
              {loading && <div className='text-center w-100'><Spin size="large" /></div>}
              <p className="bottom-description text-blue text-center hide">
                Got a voucher?{" "}
                <span className="span-link" onClick={onRedeemVoucher}>
                  Redeem an NFT voucher
                </span>{" "}
                from Ethereum to claim your Atomic NFT.
              </p>
            </div>
          </div>
        </Container>
      </RegisterContentContainer>
    </MetaWrapper>
  );
}

export default RegisterContent;
