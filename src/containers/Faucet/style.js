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
    background: ${colors.orangeLight};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 32px 24px;
    /* margin-bottom: 16px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 32px 55px 24px 55px;
    &.carousel {
      .carousel-control-prev,
      .carousel-control-next {
        width: 50px;
      }
      .carousel-inner {
        flex: 1;
        display: flex;
        flex-direction: column;
        .carousel-item {
          flex: 1;
          .faucet-step-card {
            display: flex;
            min-height: 180px;
            align-items: flex-start;
            .step-content {
              .step-title {
                font-weight: 600;
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
