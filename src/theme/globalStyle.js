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
  nav {
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
}
h1 {
    font-size: 40px !important;
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
    font-size: 24px;
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
    &:hover, &:focus {
        color: ${colors.white};
        background-color: ${colors.blueDark};
    }
    font-weight: 600;
    font-size: 16px;
}
.btn-orange {
    background: ${colors.orange};
    color: ${colors.blueDark};
}
.btn-white {
    background: ${colors.white};
    color: ${colors.blueDark};
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
`;

export default GlobalStyle;
