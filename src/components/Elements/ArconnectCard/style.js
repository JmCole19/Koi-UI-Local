import styled from "styled-components";
import { colors } from "theme";

export const ArconnectCardContainer = styled.div`
  width: 270px;
  height: 152px;

  background: ${colors.grayLight};
  border: 1.5px solid ${colors.blueDark};
  box-sizing: border-box;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  cursor: pointer;
  p {
    margin-top: 12px;
  }
`;
