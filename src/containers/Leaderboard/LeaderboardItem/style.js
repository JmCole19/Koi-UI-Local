import styled from "styled-components";
import { colors, mixins } from "theme";

export const LeaderboardItemContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.grayLight};
  border-bottom: 2px solid ${colors.grayGreen};
  min-height: 192px;
  padding: 0px 56px;
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
        .explore-block {
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.03em;
          color: #237b75;
          border: 1px solid #237b75;
          box-sizing: border-box;
          border-radius: 2px;
          margin-bottom: 0;
          width: fit-content;
          padding: 0 5px;
          font-size: 12px !important;
          cursor: pointer;
        }
      }
    }
  }
  .part-right {
    min-width: 216px;
    .item-col {
      padding: 0 10px;
      &.item-reviews-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: #ecfffe;
        box-shadow: 0px 2px 4px rgb(0 0 0 / 16%);
        border-radius: 2px;
        margin-bottom: 10px;
        padding: 10px;
        h5 {
          color: ${colors.greenDark};
        }
      }
    }
    .btns-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      .btn {
        height: 40px;
        &.btn-html {
          margin-left: 28px;
          width: 40px;
          height: 40px;
          background: ${colors.white};
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
          border-radius: 3px;
          color: ${colors.blueDark};
          border: 2.5px solid ${colors.blueDark};
        }
        &.btn-share {
          flex: 1;
          background: ${colors.blueGradient};
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
          border-radius: 3px;
          font-size: 18px;
        }
      }
    }
    .social-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
