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
      @media (max-width: ${mixins.sm}px) {
        font-size: 16px;
        line-height: 22px;
      }
      @media (max-width: ${mixins.xs}px) {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .font-n-1{
      color: ${colors.blueDark};
      font-size: 24px;
      line-height: 32px;
      letter-spacing: 0.03em;
    }
    .height-auto{height: auto !important;}
    .height-130{height: 130px !important;}
    .overlay-opensea{
      position: relative;
      margin-right: -5px;
    }
    .flex1{ flex: 1; }
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
    .ant-spin-text { color: ${colors.blueDark}; }
    .f-32 {
        font-size: 32px !important;
    }
    .hide{display: none;}
    .font-light{ font-weight: 300 !important; }
    .text-italic{ font-style: italic !important; }
    .w40{width: 40px !important;}
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
      @media (max-width: ${mixins.sm}px) {
        font-size: 16px;
      }
      @media (max-width: 480px) {
        font-size: 14px;
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
    .lbl-beta{
      background-color: ${colors.greenLight};
      padding: 0px 5px;
      line-height: 10px;
      text-transform: uppercase;
      font-size: 20px;
      vertical-align: middle;
    }
    #overlay-nav {
      display: block;
      padding: 0;
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
                  .btn-disconnect{
                    height: 32px;
                    background: #fff;
                    letter-spacing: 0.03em;
                    color: ${colors.blueDark};
                    box-sizing: border-box;
                    border-radius: 4px;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 15px;
                    text-align: center;
                  }
              }
          }
      }
      @media (max-width: ${mixins.sm}px){
        display: none;
      }
    }
    .explore-block {
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.03em;
      color: #237b75;
      border: 1px solid #237b75;
      box-sizing: border-box;
      border-radius: 2px;
      margin-bottom: 0;
      width: fit-content;
      padding: 0 5px;
      font-size: 12px !important;
      cursor: pointer;
    }
    .custom-notification-error{
        background-color: ${colors.errorBackground};
    }
    .custom-notification-success{
        background-color: ${colors.successBackground};
    }
`;

export default GlobalStyle;
