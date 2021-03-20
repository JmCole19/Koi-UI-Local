import styled from "styled-components";
import { colors, mixins } from "theme";

export const ConfirmOpenseasContainer = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  .container {
    .upload-content-wrapper {
      padding: 30px 0 255px;
      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-wrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 55px;
          .back-wrapper {
            width: fit-content;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
        /* h1 {
          width: 100%;
        } */
        .upload-wrapper {
          position: relative;
          width: 100%;
          background: ${colors.orangeLight};
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          padding: 16px;
          max-width: 896px;
          .icon-back {
            position: absolute;
            top: 12px;
            right: 12px;
            cursor: pointer;
            z-index: 1;
            i {
              font-size: 24px;
              color: ${colors.blueDark};
            }
          }
          .upload-header {
            margin-bottom: 18px;
            .upload-header-title {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              min-height: 64px;
              h6 {
                font-weight: 600;
              }
              .upload-step {
                width: 32px;
                height: 32px;
              }
              .header-description {
                position: relative;
                p {
                  position: absolute;
                  a {
                    color: ${colors.blueDark};
                    text-decoration: underline;
                  }
                }
              }
            }
          }
          .upload-content-form {
            display: flex;
            align-items: flex-start;
            .content-img-wrapper {
              width: 130px;
              display: flex;
              justify-content: flex-start;
            }
            .upload-content-row {
              margin-left: 34px;
              .ant-form-item-control-input-content {
                display: flex;
                .left {
                  min-width: 98px;
                  color: ${colors.blueDark};
                }
                .ethereum-value-input {
                  max-width: 466px;
                  border: 1.5px solid ${colors.blueDark};
                  box-sizing: border-box;
                  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
                  border-radius: 4px;
                }
                .btn-confirm,
                .btn-edit {
                  min-width: 186px;
                  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
                  border-radius: 4px;
                }
              }
            }
          }
          .upload-cards-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 60px;
            margin-bottom: 32px;
            .single-ant-file-upload {
              width: 270px;
              height: 152px;
              padding: 8px;
              background: ${colors.grayLight};
              border: 1.5px solid ${colors.blueDark};
              box-sizing: border-box;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
              border-radius: 4px;
              .ant-upload {
                &.ant-upload-drag {
                  background: ${colors.grayLight};
                  border: 2px dashed ${colors.greenDark};
                  border-radius: 4px;
                  &:hover {
                    border: 2px dashed ${colors.greenLight};
                  }
                }
                .ant-upload-btn {
                  padding: 0;
                  .uploader-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0 24px;
                    cursor: pointer;
                    .uploader-icon {
                      img {
                        width: 62px;
                        height: 62px;
                      }
                      i {
                        font-size: 20px;
                      }
                    }
                    p {
                      font-size: 14px;
                    }
                    span {
                      font-size: 12px;
                      opacity: 0.4;
                      &.ant-spin-dot {
                        opacity: 1;
                        font-size: 36px;
                      }
                    }
                  }
                }
              }
            }
            .arConnect-card {
              width: 270px;
              height: 152px;

              background: ${colors.grayLight};
              border: 1.5px solid ${colors.blueDark};
              box-sizing: border-box;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 0 24px;
              cursor: pointer;
              p {
                margin-top: 12px;
              }
            }
          }
          .uploaded-cards-wrapper {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 30px;
            .uploaded-card {
              max-width: 183px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              p {
                text-align: center;
                margin-top: 20px;
                font-weight: 600;
              }
              .uploaded-card-btns {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: auto;
                .btn {
                  width: 32px;
                  height: 32px;
                  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
                  border-radius: 3px;
                  &.btn-html {
                    margin-left: 24px;
                  }
                }
              }
            }
          }
          .btn-see-contents {
            width: 200px;
            height: 40px;
            margin-bottom: 25px;
            margin-top: 40px;
          }
          .footer-description {
            text-align: center;
            a {
              color: ${colors.blueDark};
              font-weight: 700;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    .progress-sm {
      position: absolute;
      top: 0;
      .ant-progress-outer {
        display: flex;
      }
    }
    .container {
      .upload-content-wrapper {
        .upload-content {
          .title-wrapper {
            display: flex;
            justify-content: space-between;
            flex-direction: column-reverse;
            .upload-title {
              font-size: 28px !important;
            }
            .back-wrapper {
              margin-bottom: 15px;
            }
          }
          .upload-wrapper {
            .upload-header {
              margin-bottom: 18px;
              .upload-header-title {
                display: flex;
                align-items: center;
                .type-img-wrapper {
                  img {
                    width: 36px;
                  }
                }
                h6 {
                  font-size: 16px !important;
                }
              }
            }
            .upload-content-form {
              flex-direction: column;
              .content-img-wrapper {
                width: 100%;
                justify-content: center;
                margin-bottom: 35px;
              }
              .upload-content-row {
                margin-left: 0;
                width: 100%;
                .ant-form-item-control-input-content {
                  flex-direction: column;
                  .btn-edit {
                    margin-left: 0px !important;
                    margin-top: 25px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SingleAntFileUpload = styled.div`
  width: 270px;
  height: 152px;
  padding: 8px;
  background: ${colors.grayLight};
  border: 1.5px solid ${colors.blueDark};
  box-sizing: border-box;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  .ant-upload {
    &.ant-upload-drag {
      background: ${colors.grayLight};
      border: 2px dashed ${colors.greenDark};
      border-radius: 4px;
      &:hover {
        border: 2px dashed ${colors.greenLight};
      }
    }
    .ant-upload-btn {
      padding: 0;
      .uploader-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 24px;
        cursor: pointer;
        .uploader-icon {
          img {
            width: 62px;
            height: 62px;
          }
          i {
            font-size: 20px;
          }
        }
        p {
          font-size: 14px;
        }
        span {
          font-size: 12px;
          opacity: 0.4;
          &.ant-spin-dot {
            opacity: 1;
            font-size: 36px;
          }
        }
      }
    }
  }
`;
