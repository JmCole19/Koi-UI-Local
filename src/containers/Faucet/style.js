import styled from "styled-components";
import { colors } from "theme";

export const FaucetContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.blueLight};
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 196px;
  .faucet-cards-wrapper {
    margin-top: 65px;
    .carousel-control-prev,
    .carousel-control-next {
      width: 50px;
    }
    background: ${colors.orangeLight};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    /* margin-bottom: 16px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 896px;
    margin-left: auto;
    margin-right: auto;
    &.carousel {
      .carousel-control-prev,
      .carousel-control-next {
        display: none;
      }
      .carousel-inner {
        .carousel-item {
          .faucet-step-card {
            position: relative;
            display: flex;
            min-height: 300px;
            height: 300px;
            align-items: flex-start;
            padding: 43px 152px;
            .icon-back {
              position: absolute;
              left: 10px;
              top: 10px;
              cursor: pointer;
              i {
                font-size: 24px;
              }
            }
            h1 {
              line-height: 20px;
            }
            .step-content {
              height: 100%;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-between;
              margin-left: 12px;
              .step-title {
                font-weight: 600;
              }
              h6 {
                b {
                  font-weight: 600;
                  text-decoration: underline;
                }
              }
              p {
                font-size: 15px !important;
              }
              .btn-step-card {
                width: 166px;
                height: 32px;
                background: ${colors.white};
                border: 2px solid ${colors.blueDark};
                box-sizing: border-box;
                border-radius: 4px;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 15px;
                text-align: center;
                letter-spacing: 0.03em;
                color: ${colors.blueDark};
                margin-bottom: 14px;
              }
              &.has-wallet {
                justify-content: flex-start;
                .submit-wrapper {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-top: 50px;
                  .input-address {
                    flex: 1;
                    border: 2px solid ${colors.blueDark};
                    box-sizing: border-box;
                    border-radius: 4px;
                  }
                  .btn-step-card {
                    margin-bottom: 0;
                    margin-left: 28px;
                    background: ${colors.blueDark};
                    color: ${colors.white};
                  }
                }
              }
              &.congratulation {
                align-items: center;
              }
            }
          }
        }
      }
      .carousel-indicators {
        margin-bottom: 0px;
        li {
          width: 8px;
          height: 8px;
          border: solid 1px ${colors.redLight};
          border-radius: 50%;
          background-color: transparent;
          margin: 16px 8px;
          opacity: 1;
          &.active {
            background-color: ${colors.redLight} !important;
          }
        }
      }
    }
  }
`;
