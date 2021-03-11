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
  .w100 {width: 100%;}
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
    }
    .btn-white {
        background: ${colors.white};
        color: ${colors.blueDark};
        border: 2.5px solid ${colors.blueDark};
        &:hover, &:focus, &:active {
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
    .item-modal {
        .modal-content {
            .modal-body {
                padding: 0;
                .item-modal-header {
                    background: ${colors.blueDark};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 48px;
                    padding: 0 16px;
                    h2 {
                        margin-left: 20px;
                    }
                    .btn {
                        height: 30px;
                        font-size: 16px;
                        line-height: 18px;
                        text-align: center;
                        letter-spacing: 0.03em;
                    }
                }
                .item-modal-body {
                    padding: 16px 87px;
                    .img-wrapper {
                        img {
                            width: 100%;
                        }
                    }
                    .item-info-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        .item-info-left {
                            .item-username {
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 24px;
                                letter-spacing: 0.03em;
                                background: #FFC78F;
                                border-radius: 2px;
                                width: fit-content;
                                padding: 2px 5px;
                            }
                        }
                        .item-info-right {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                        }
                    }
                }
            }
        }
        @media (min-width: 576px) {
            max-width: 800px;
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
`;

export default GlobalStyle;
