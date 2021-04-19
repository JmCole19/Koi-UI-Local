import styled from "styled-components";
import { mixins } from "theme";
// import { colors } from "theme";

export const PlayMediaContainer = styled.div`
    &.embed-video{
        width: 100%;
        min-width: 130px;
        @media (max-width: ${mixins.sm}px) {
            min-width: 350px;
        }
        @media (max-width: 480px) {
            min-width: 256px;
        }
    }
    &.embed-audio{
        width: 100%;
        min-width: 130px;
        @media (max-width: ${mixins.sm}px) {
            min-width: 350px;
        }
        @media (max-width: 480px) {
            min-width: 256px;
        }
    }
    &.embed-image{
        width: 200px;
    }
`;
