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
  .container {
    .content-detail-wrapper {
      padding: 30px 0 100px;
      .content-detail {
        
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
  }
  @media (max-width: ${mixins.sm}px) {
    .container {
      .content-detail-wrapper {
        .content-detail {
          
        }
      }
    }
  }
`;
