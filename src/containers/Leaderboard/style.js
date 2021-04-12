import styled from "styled-components";
import { colors, mixins } from "theme";

export const LeaderboardContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  .leaderboard-header {
    background: ${colors.gray};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 55px;
    position: sticky;
    top: 80px;
    width: 100%;
    z-index: 9;
    .filter-options {
      margin-left: 95px;
      .filter-option {
        height: 30px;
        background-color: ${colors.orange};
        font-size: 15px;
        padding: 0 15px;
        color: ${colors.blueDark};
        border-color: transparent;
        box-shadow: unset;
        transition: all 0.5s ease;
        letter-spacing: 0.03em;
        line-height: 24px;
        &:focus {
          box-shadow: unset;
        }
        &.selected {
          transform: scale(1.1);
          background: white;
          box-shadow: unset;
          z-index: 10;
        }
      }
    }
    .filter-options-mobile {
      width: 80px;
      height: 6px;
      background: ${colors.orange};
      display: flex;
      align-items: center;
      border-radius: 2px;
      margin-right: auto;
      margin-left: 20px;
      .example-thumb {
        width: 31px;
        height: 23px;
        background: ${colors.white};
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 24px;
        border-radius: 2px;
        color: ${colors.blueDark};
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    }
    .filter-options-desktop {
      width: 208px;
      height: 24px;
      background: ${colors.orange};
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 2px;
      margin-right: auto;
      margin-left: 20px;
      cursor: pointer;
      .example-mark {
        flex: 1;
        text-align: center;
        color: ${colors.blueDark};
      }
      .example-thumb {
        width: 30px;
        height: 30px;
        background: ${colors.white};
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 24px;
        border-radius: 2px;
        color: ${colors.blueDark};
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    }
    .leader-board-search-input {
      width: 184px;
      input {
        height: 30px;
      }
      .input-group-append {
        .input-group-text {
          padding: 0 10px;
          background: ${colors.orange};
          color: ${colors.blueDark};
        }
      }
    }
    .icon-crown,
    .icon-user {
      margin-right: 56px;
    }
    .btn-leaderbard-plus {
      height: 30px;
      width: 30px;
      background: ${colors.greenLight};
      color: ${colors.blueDark};
      font-size: 18px;
      border-radius: 4px;
    }
    .btn-my-content {
      background: transparent;
      border: 2.5px solid ${colors.blueDark};
      box-sizing: border-box;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      color: ${colors.blueDark};
      margin-right: 36px;
    }
  }
  .leaderboard {
    width: 100%;
    background: white;
    box-shadow: 0px 4px 12px rgb(0 0 0 / 25%);
    border-radius: 4px;
  }
  .leaderboard-items {
    .loading-container {
      display: flex;
      justify-content: center;
    }
    .ant-collapse {
      .ant-collapse-item {
        .ant-collapse-header {
          padding: 0px;
        }
        .ant-collapse-content {
          .ant-collapse-content-box {
            padding: 0px;
          }
        }
      }
    }
    .btn-show-more-wrapper {
      padding: 15px 0;
      display: flex;
      justify-content: center;
      .btn-show-more {
        width: 166px;
        height: 36px;
        font-size: 20px;
        background: ${colors.blueDark};
        border-radius: 4px;
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
    .leaderboard-header {
      padding: 0px 15px;
      min-height: 45px;
      top: 48px;
      h2 {
        font-size: 16px !important;
      }
      .btn-my-content {
        margin-right: 5px;
      }
    }
  }
  @media (max-width: ${mixins.sm}px) {
    .leaderboard-header {
      h2, .btn-my-content {
        font-size: 14px !important;
      }
      .btn-my-content {
        margin-right: 5px;
      }
    }
  }
`;
export const StyledThumb = styled.div`
  width: 30px;
  height: 30px;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 24px;
  border-radius: 2px;
  color: ${colors.blueDark};
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  left: ${(props) =>
    props.value === 0
      ? "5px !important"
      : props.value === 4
      ? "172px !important"
      : ""};
  &:focus {
    outline: none;
  }
`;
export const LinkNftUpload = styled.div`
  padding: 10px;
  &.big{ padding: 25px; }
`;
