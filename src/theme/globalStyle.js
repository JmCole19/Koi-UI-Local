import { createGlobalStyle } from "styled-components";
import { colors, fonts, mixins } from "theme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${fonts.main};
    margin: 0;
    height: 100%;
  }
  .App {
    height: 100vh;
  }
  .custom-pd{
    width: 500px;
    @media (max-width: 600px) {
      width: 400px
    }
    @media (max-width: 480px) {
      width: 100%;
      padding-left: 10%;
      padding-right: 10%;
    }
  }
  nav {
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    }
    h1 {
      font-size: 32px !important;
      font-weight: 600;
    }
    h2 {
      font-size: 28px !important;
      font-weight: 600;
    }
    h3 {
      font-size: 24px !important;
      font-weight: 600;
    }
    h4 {
      font-size: 22px !important;
      font-weight: 400;
    }
    h5 {
        font-size: 20px !important;
        letter-spacing: 0.03em;
    }
    h6 {
        font-size: 18px !important;
        letter-spacing: 0.03em;
        font-weight: 400;
    }
    p {
        font-size: 16px !important;
        line-height: 24px;
        letter-spacing: 0.03em;
    }
    .br-4{ border-radius: 4px; }
    .span-link{
      color: ${colors.blueDark};
      font-weight: 600;
      text-decoration: underline;
      letter-spacing: 0.03em;
      touch-action: manipulation;
      cursor: pointer;
    }
    .font-s-1{
      color: ${colors.blueDark};
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.03em;
    }
    .font-n-1{
      color: ${colors.blueDark};
      font-size: 24px;
      line-height: 32px;
      letter-spacing: 0.03em;
    }
    .overlay-opensea{
      position: relative;
      margin-right: -5px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a {
        font-family: ${fonts.main};
        letter-spacing: 0.03em;
    }

    .f-32 {
        font-size: 32px !important;
    }
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        max-height: 40px !important;
        border-radius: 2px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
        font-weight: 600 !important;
        border-color: transparent;
        &:focus, &:hover {
            border-color: transparent;
            box-shadow: unset;
        }
    }
    .form-control:focus {
        color: #495057;
        background-color: #fff;
        border-color: #ced4da;
        box-shadow: unset;
    }
    .btn-blueDark {
        background: ${colors.blueDark};
        color: ${colors.white};
        &:hover, &:focus, &:disabled {
            color: ${colors.white};
            background-color: ${colors.blueDark};
            border-color: transparent;
        }
        font-weight: 600;
    }
    .btn-orange {
        background: ${colors.orange};
        color: ${colors.blueDark};
        &:hover, &:focus, &:disabled, &:active {
            color: ${colors.white} !important;
            background-color: ${colors.blueDark} !important;
            border-color: transparent;
            h6, svg {
              color: ${colors.white} !important;
            }
        }
    }
    .btn-white {
        background: ${colors.white};
        color: ${colors.blueDark};
        border: 2.5px solid ${colors.blueDark};
        &:hover, &:focus, &:active {
            color: ${colors.blueDark};
            background-color: ${colors.white};
            border: 2.5px solid ${colors.blueDark};
        }
    }
    .btn-green {
        background: ${colors.green};
        color: ${colors.blueDark};
    }

    .text-blue {
        color: ${colors.blueDark};
    }
    .text-greenDark {
        color: ${colors.greenDark};
    }
    .text-bold {
        font-weight: 700;
    }
    .cursor {
        cursor: pointer;
    }
    
    .modal-confirm-transaction {
      .modal-content {
        display: flex;
        align-items: center;
        .modal-body {
          position: unset;
          min-width: 330px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 0;
          .icon-close {
            position: absolute;
            right: 8px;
            top: 8px;
          }
          .imgs-wrapper {
            margin: 23px 0;
          }
          .modal-row {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .btn-connect {
            width: 186px;
            height: 40px;
            border-radius: 4px;
            margin-top: 32px;
          }
        }
      }
      @media (min-width: 576px) {
        max-width: 662px;
      }
      @media (max-width: ${mixins.sm}px) {
        .modal-content {
          .modal-body {
            .item-modal-body {
              padding: 16px 13px;
              .item-info-wrapper {
                h1 {
                    font-size: 28px !important;
                }
              }
            }
          }
        }
      }
    }
    .modal-share {
      .modal-content {
        display: flex;
        align-items: center;
        .modal-body {
          position: unset;
          min-width: 330px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 33px;
          .icon-close {
            position: absolute;
            right: 8px;
            top: 8px;
          }
          .modal-title {
            margin-bottom: 26px;
          }
          .modal-description {
            letter-spacing: 0.03em;
            margin-bottom: 30px;
          }
          .footer-title {
            margin-bottom: 0;
            b {
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .content-wrapper {
            width: 100%;
            display: flex;
            align-items: flex-start;
            .modal-left {
              width: 136px;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 100%;
                filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
                border-radius: 4px;
                margin-bottom: 12px;
              }
            }
            .modal-right {
              flex: 1;
              margin-left: 50px;
              .part {
                margin-bottom: 25px;
                .input-group {
                  position: relative;
                  width: 100%;
                  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
                  .copied-message {
                    width: 100%;
                    position: absolute;
                    bottom: -26px;
                    height: 26px;
                    background: #9BE7C4;
                    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
                    border-radius: 0px 0px 4px 4px;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 10px;
                    line-height: 12px;
                    color: ${colors.blueDark};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .form-control {
                    height: 32px;
                    border-color: ${colors.greenDark};
                    border-right: unset;
                  }
                  .input-group-btn {
                    .btn {
                      height: 32px;
                      font-size: 15px !important;
                      border-radius: 0 4px 4px 0;
                      transform: unset;
                    }
                  }
                }
                .part-title {
                  line-height: 22px;
                  letter-spacing: 0.03em;
                  margin-bottom: 5px;
                }
                .share-social, .share-direct {
                  display: flex;
                  justify-content: flex-start;
                  .icon-share {
                    min-width: 35px;
                    margin-right: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                      font-size: 10px !important;
                      margin-bottom: 0;
                    }
                  }
                }
              }
              
            }
          }
        }
      }
      @media (min-width: 576px) {
        max-width: 662px;
      }
      @media (max-width: ${mixins.sm}px) {
        .modal-content {
          .modal-body {
            .item-modal-body {
              padding: 16px 13px;
              .item-info-wrapper {
                h1 {
                    font-size: 28px !important;
                }
              }
            }
          }
        }
      }
    }
    #overlay-nav {
        padding: 24px 0 0;
        opacity: 1;
        .tooltip-inner {
            padding: 0;
            background-color: ${colors.blueDark};
            min-width: 230px;
            max-width: 300px;
            border-radius: 0px 0px 6px 6px;
            p {
                margin-bottom: 0;
            }
            .overlay-header {
                border-bottom: 1px solid ${colors.blueLight};
                padding: 5px 13px;
            }
            .overlay-body {
                padding: 5px 0;
                .overlay-body-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 13px;
                    p.overlay-value {
                        font-weight: 600;
                        margin-left: auto;
                    }
                    img {
                        max-width: 20px;
                    }
                }
            }
        }
    }
    .custom-notification-error{
        background-color: ${colors.errorBackground};
    }
    .custom-notification-success{
        background-color: ${colors.successBackground};
    }
`;

export default GlobalStyle;
