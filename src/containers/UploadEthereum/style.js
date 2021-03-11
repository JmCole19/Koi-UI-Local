import styled from "styled-components";
import { colors, mixins } from "theme";

export const UploadEthereumContainer = styled.div`
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
        h1 {
          margin-bottom: 80px;
          width: 100%;
        }
        .upload-body {
          width: 100%;
          background: ${colors.orangeLight};
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          padding: 16px;
          max-width: 896px;
          .upload-header {
            margin-bottom: 18px;
            .upload-header-title {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              min-height: 64px;
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
            .upload-content-row {
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
    .container {
      .upload-content-wrapper {
        .upload-content {
        }
      }
    }
  }
`;
