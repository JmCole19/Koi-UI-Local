import styled from 'styled-components'
import { colors, mixins } from "theme";

export const PageLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh);
  /* height: 100%; */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  .page-content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    .announcement-area{
      padding: 15px 0;
      background-color: ${colors.errorBackground};
      .message-area{
        max-width: 500px;
        text-align: center;
        margin: 0 auto;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.03em;
        color: #171753;
      }
    }
  }
`;
