import styled from "styled-components";
import { colors, mixins } from "theme";

export const RegisterContentContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  .container {
    .register-content-wrapper {
      padding: 30px 0 100px;
      .register-content {
        .register-description {
          color: ${colors.blueDark};
          margin-bottom: 34px;
        }
        .register-cards {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 15px;
          .register-card {
            position: relative;
            width: 232px;
            height: 232px;
            background: ${colors.orangeLight};
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            cursor: pointer;
            &.disable{
              cursor: not-allowed;
              background: ${colors.white};
            }
            .coming-soon{
              position: absolute;
              top: 8px;
            }
            .card-img {
              flex: 4;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .card-content {
              flex: 3;
              text-align: center;
              h5 {
                margin-bottom: 3px;
                font-weight: 600;
                color: ${colors.blueDark};
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
      .register-content-wrapper {
        .register-content {
          .register-title {
            font-size: 32px !important;
          }
          .register-description {
            font-size: 20px !important;
          }
          .register-cards {
            .register-card {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
