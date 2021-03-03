import styled from "styled-components";
import { colors } from "theme";

export const FaucetContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.blueLight};
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 50px;
  .section {
    background: ${colors.white};
    box-shadow: 0px 4px 12px rgb(0 0 0 / 25%);
    border-radius: 4px;
    padding: 30px 20px;
    &.section-set-key {
      margin-bottom: 30px;
      .set-koi-card {
        padding: 20px;
        &.set-koi-left {
          border-right: solid 1px ${colors.blueDark};
        }
      }
    }
  }
`;
