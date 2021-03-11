import styled from "styled-components";
import { colors, mixins } from "theme";

export const CheckoutContainer = styled.div`
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
          width: 100%;
        }
        .upload-body {
          width: 100%;
          background: ${colors.orangeLight};
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          padding: 16px;
          max-width: 896px;
          margin-top: 34px;
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
                    color: ${colors.greenDark};
                    text-decoration: underline;
                  }
                }
              }
            }
          }
          .upload-content-form {
            .upload-content-row {
              .ant-form-item-label {
                label {
                  color: ${colors.blueDark};
                }
              }
              .arweave-value-input {
                max-width: 466px;
                border: 1.5px solid ${colors.blueDark};
                box-sizing: border-box;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
                border-radius: 4px;
              }
            }
          }
          .single-ant-file-upload {
            width: 100%;
            max-width: 432px;
            padding: 8px;
            background: ${colors.white};
            border: 1.5px solid ${colors.blueDark};
            box-sizing: border-box;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
            border-radius: 4px;
            margin: 50px auto 64px;
            .ant-upload {
              &.ant-upload-drag {
                background: ${colors.white};
                border: 2px dashed ${colors.greenDark};
                border-radius: 4px;
                &:hover {
                  border: 2px dashed ${colors.greenLight};
                }
              }
              .ant-upload-btn {
                padding: 0;
                .uploader-container {
                  width: 100%;
                  height: 152px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  .uploader-icon {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
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
