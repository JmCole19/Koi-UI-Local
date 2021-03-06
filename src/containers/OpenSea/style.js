import styled from "styled-components";
import { colors, mixins } from "theme";

export const OpenSeaContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  padding-top: 80px;
  .container {
    .opensea-content-wrapper {
      padding: 30px 0 100px;
      .opensea-content {
        .opensea-description {
          color: ${colors.blueDark};
          margin-bottom: 34px;
        }
        .opensea-cards {
          /* display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 15px; */
          .opensea-card {
            position: relative;
            /* width: 232px; */
            height: 232px;
            background: ${colors.orangeLight};
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            /* margin-bottom: 15px; */
            cursor: pointer;
            &:hover {
              animation: pulse;
              animation-duration: 0.5s;
            }
            .icon-plus {

            }
            .icon-checked {
              
            }
            .card-img {
              flex: 4;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .card-content {
              flex: 3;
              text-align: center;
              h5 {
                margin-bottom: 3px;
                font-weight: 600;
                color: ${colors.blueDark};
              }
              p {
                line-height: 24px;
                letter-spacing: 0.02em;
                color: ${colors.blueDark};
              }
            }
          }
        }
        .btn-back-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 76px;
          .btn-back {
            font-size: 16px;
            height: 40px;
            width: 200px;
            border-radius: 4px;
          }
        }
        .bottom-description {
          margin-top: 16px;
          a {
            color: ${colors.blueDark};
            font-weight: 600;
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    .container {
      .opensea-content-wrapper {
        .opensea-content {
          .opensea-title {
            font-size: 32px !important;
          }
          .opensea-description {
            font-size: 20px !important;
          }
          .opensea-cards {
            .opensea-card {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
