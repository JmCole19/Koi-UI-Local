import styled from "styled-components";
import { colors, mixins } from "theme";

export const LeaderboardItemContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.grayLight};
  border-bottom: 2px solid ${colors.grayGreen};
  min-height: 192px;
  padding: 0px 56px;
  .item-container{
    display: flex;
    flex: 1;
    align-items: center;
  }
  .w30{width: 30px;}
  .part-left {
    display: flex;
    flex: 1;
    align-items: center;
    .item-col {
      padding: 0 10px;
      .item-order {
        color: ${colors.blueDark};
      }
      &.item-img-wrapper {
        min-width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        .w30{ text-align: left;}
        img {
          width: 100%;
          max-width: 144px;
          border-radius: 4px;
          margin: 15px 0;
          border-radius: 4px;
        }
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
    .share-wrapper {
      display: flex;
      flex-direction: column;
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
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    padding: 0px 35px;
    .item-container{
      flex-direction: column;
      padding: 20px 11px 10px;
    }
    .sx-hidden-share{display: none;}
    .part-left {
      width: 100%;
      margin-bottom: 20px;
      .item-col {
        &.item-info-wrapper {
          flex: 2;
          margin-left: auto;
          .item-title {
            font-size: 24px !important;
          }
          .item-created_at {
            font-size: 15px !important;
          }
        }
        &.item-img-wrapper {
          flex: 1;
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
        padding: 0px;
        &.item-reviews-wrapper {
          align-items: center;
          flex: 2;
        }
      }
      .share-wrapper {
        flex: 3;
        margin-left: 15px;
      }
    }
  }
  @media (max-width: 479px) {
    padding: 0px 20px;
    .item-reviews-wrapper {
      margin-bottom: 25px !important;
      padding: 5px !important;
      h5 { font-size: 16px !important; }
    }
  }
`;
