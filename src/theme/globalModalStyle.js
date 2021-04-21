import { createGlobalStyle } from "styled-components";
import { colors, mixins } from "theme";

const GlobalModalStyle = createGlobalStyle`
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
        padding: 24px 20px;
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
          @media (max-width: ${mixins.xs}px){
            font-size: 22px !important;
            margin-bottom: 20px;
            letter-spacing: 0;
          }
          @media (max-width: 480px){
            font-size: 20px !important;
            margin-bottom: 10px;
            line-height: 22px;
          }
        }
        .modal-description {
          letter-spacing: 0.03em;
          @media (max-width: ${mixins.xs}px){
            font-size: 16px !important;
            margin-bottom: 10px;
            letter-spacing: 0;
          }
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
          @media (max-width: ${mixins.xs}px) {
            flex-direction: column;
            .modal-left{
              text-align: center;
              width: 100%;
              margin-bottom: 20px;
              img{ max-width: 300px; }
            }
            .modal-right{
              margin-left: 0px;
              width: 100%;
            }
          }
          @media (max-width: 480px) {
            .modal-left{
              img{ max-width: 260px; }
            }
            .modal-right{
              margin-left: 0px;
            }
          }
          @media (max-width: 360px) {
            .modal-left{
              img{ max-width: 220px; }
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
`;

export default GlobalModalStyle;
