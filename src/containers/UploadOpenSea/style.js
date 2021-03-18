import styled from "styled-components";
import { colors, mixins } from "theme";

export const UploadOpenSeaContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  flex-direction: column;
  .container {
    .opensea-content-wrapper {
      padding: 30px 0 100px;
      .opensea-content {
        .opensea-description {
          color: ${colors.blueDark};
          margin-bottom: 34px;
          max-width: 560px;
          line-height: 32px;
        }
        .counts-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 34px;
          .selected-counts {
            width: 40px;
            height: 40px;
            background: ${colors.gray};
            border: 2px solid transparent;
            box-sizing: border-box;
            font-size: 22px;
            line-height: 22px;
            letter-spacing: 0.03em;
            color: ${colors.grayDark};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            &.isSet {
              color: ${colors.blueDark};
              background: ${colors.green};
              border: 2px solid ${colors.blueDark};
            }
          }
          .btn-all {
            background: ${colors.white};
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            width: 155px;
            height: 40px;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.03em;
            color: ${colors.blueDark};
            margin-left: 38px;
            &.selected-all {
              background: ${colors.greenLight};
              border: 2px solid ${colors.blueDark};
              box-sizing: border-box;
              box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
              border-radius: 4px;
            }
          }
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
            background: ${colors.white};
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.5s ease;
            &:hover {
              /* animation: pulse;
              animation-duration: 0.5s; */
              border: 2px solid ${colors.blueDark};
            }
            &.selected {
              background: ${colors.greenLight};
              border: 2px solid ${colors.blueDark};
              box-sizing: border-box;
            }
            .icon-plus {
              position: absolute;
              right: 5px;
              top: 5px;
              width: 26px;
              height: 26px;
              background: ${colors.gray};
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              color: ${colors.grayDark};
            }
            .icon-checked {
              position: absolute;
              right: -10px;
              top: -10px;
              width: 38px;
              height: 38px;
              background: ${colors.green};
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              color: ${colors.blueDark};
              border: 2px solid ${colors.blueDark};
              box-sizing: border-box;
              font-size: 18px;
            }
            .card-img {
              min-height: 176px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
                border-radius: 4px;
              }
            }
            .card-content {
              flex: 1;
              text-align: center;
              padding: 0 20px;
              h6 {
                margin-bottom: 3px;
                font-weight: 600;
                color: ${colors.blueDark};
                line-height: 22px;
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
