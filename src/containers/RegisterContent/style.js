import styled from "styled-components";
import { colors, mixins } from "theme";

export const RegisterContentContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  padding-top: 80px;
  .container {
    .register-content-wrapper {
      padding: 30px 0 100px;
      .register-content {
        .register-description {
          color: ${colors.blueDark};
          margin-bottom: 34px;
        }
        .register-card-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
          .register-card {
            width: 232px;
            height: 232px;
            background: ${colors.orangeLight};
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              margin-bottom: 31px;
            }
            h5 {
              margin-bottom: 3px;
            }
            p {
              line-height: 24px;
              letter-spacing: 0.02em;
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
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    .container {
      .register-content-wrapper {
        .register-content {
          .register-title {
            font-size: 32px !important;
          }
          .register-description {
            font-size: 20px !important;
          }
          .register-card-wrapper {
            .register-card {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
