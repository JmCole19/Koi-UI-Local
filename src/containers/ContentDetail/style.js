import styled from "styled-components";
import { colors, mixins } from "theme";

export const ContentDetailContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  padding-top: 80px;
  .content-detail-wrapper {
    width: 100%;
    padding: 0px 0 230px;
    .content-detail {
      width: 100%;
      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${colors.gray};
      }
      .detail-body {
        padding-top: 118px;
        .detail-body-description {
          h1 {
            font-size: 48px !important;
          }
          p {
            color: ${colors.blueDark};
            &.see-more {
              color: ${colors.greenDark};
            }
          }
          .views-wrapper {
            .view-row {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              h5 {
                color: ${colors.blueDark};
                &.total-views {
                  color: ${colors.greenDark};
                }
              }
            }
          }
          .btns-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 12px;
          }
          .social-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 200px;
            margin-top: 14px;
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    .content-detail-wrapper {
      .content-detail {
      }
    }
  }
`;
