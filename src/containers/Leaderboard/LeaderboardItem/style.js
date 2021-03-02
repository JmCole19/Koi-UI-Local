import styled from "styled-components";
import { colors, mixins } from "theme";

export const LeaderboardItemContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-bottom: 2px solid ${colors.grayGreen};
  min-height: 192px;
  padding: 43px 11px;
  display: flex;
  align-items: center;
  .part-left {
    display: flex;
    flex: 1;
    align-items: center;
    .item-col {
      padding: 0 10px;
      .item-order {
        color: ${colors.blueDark};
      }
      &.item-info-wrapper {
        flex: 1;
        .item-title {
          color: ${colors.blueDark};
          font-weight: 600;
        }
        .item-username {
          background: ${colors.orange};
          color: ${colors.blueDark};
          border-radius: 2px;
          width: fit-content;
          padding: 0 10px;
          font-weight: 500;
        }
        .item-created_at {
          color: ${colors.greenDark};
        }
      }
    }
  }
  .part-right {
    .item-col {
      padding: 0 10px;
      &.item-reviews-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        h5 {
          color: ${colors.greenDark};
        }
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    flex-direction: column;
    padding: 43px 11px 10px;
    .part-left {
      width: 100%;
      margin-bottom: 40px;
      .item-col {
        &.item-info-wrapper {
          flex: none;
          margin-left: auto;
          .item-title {
            font-size: 24px !important;
          }
          .item-created_at {
            font-size: 15px !important;
          }
        }
        &.item-img-wrapper {
          img {
            width: 128px;
          }
        }
      }
    }
    .part-right {
      width: 100%;
      display: flex;
      justify-content: center;
      .item-col {
        &.item-reviews-wrapper {
          align-items: center;
        }
      }
    }
  }
`;
