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
  padding-bottom: 50px;
  .faucet-cards-wrapper {
    .carousel-control-prev,
    .carousel-control-next {
      width: 50px;
    }
    background: ${colors.orangeLight};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 32px 24px;
    /* margin-bottom: 16px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 43px 152px;
    &.carousel {
      .carousel-control-prev,
      .carousel-control-next {
        width: 50px;
      }
      .carousel-inner {
        .carousel-item {
          .faucet-step-card {
            display: flex;
            min-height: 180px;
            height: 180px;
            align-items: flex-start;
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
