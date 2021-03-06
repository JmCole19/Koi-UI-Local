import styled from "styled-components";
import { colors, mixins } from "theme";

export const FooterContainer = styled.footer`
  background: ${colors.blueDark};
  color: ${colors.white} !important;
  padding: 70px 0 24px;
  .container {
    h2 {
      color: ${colors.white};
    }
    h3.footer-description {
      margin-bottom: 35px;
      font-weight: normal;
      color: ${colors.white};
    }
    p.field-label {
      font-size: 15px !important;
      margin-bottom: 0;
      color: ${colors.white};
    }
    .input-group {
      width: 248px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      .form-control {
        height: 32px;
      }
      .input-group-btn {
        .btn {
          height: 32px;
          font-size: 15px;
          border-radius: 0 4px 4px 0;
          transform: unset;
          &:hover{
            background-color: ${colors.orange} !important;
          }
        }
      }
    }
    .email-list{
      width: 100%;
      background: ${colors.greenLight};
      border-radius: .25rem;
      border: 1px solid #ced4da;
      padding: 3px;
      .lbl-email-list{
        margin: 0 auto;
        display: table;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: ${colors.blueDark};
      }
    }
    .footer-options-wrapper {
      margin-top: 32px;
      margin-bottom: 47px;
      .footer-option {
        .footer-option-title {
          margin-bottom: 13px;
          font-weight: bold;
          color: ${colors.white};
        }
        &.company {
          .footer-option-list {
            max-height: 154px;
          }
        }
        .footer-option-list {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          .nav-item {
            .nav-link {
              font-size: 18px;
              color: ${colors.white};
              padding: 0;
              width: fit-content;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.xl}px) {
    .container {
      h2 {
        font-size: 24px !important;
      }
      h3 {
        margin-bottom: 27px;
        font-size: 20px !important;
        font-weight: 400;
        line-height: 32px;
      }
      p.field-label {
        font-size: 15px !important;
        margin-bottom: 0;
      }
      .input-group {
        width: 100%;
      }
      .footer-options-wrapper {
        margin-top: 32px;
        margin-bottom: 47px;
        .footer-option {
          margin-bottom: 37px;
          .footer-option-title {
            margin-bottom: 13px;
            text-align: center;
          }
          &.get-involved {
            .footer-option-list {
              max-height: 123px;
            }
          }
          &.get-in-touch {
            .footer-option-list {
              padding-left: 0;
              width: fit-content;
              margin: auto;
            }
          }
          .footer-option-list {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            /* padding-left: 32px; */
            .nav-item {
              .nav-link {
                font-size: 18px !important;
                color: ${colors.white};
                padding: 0;
                font-weight: 300;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`;
