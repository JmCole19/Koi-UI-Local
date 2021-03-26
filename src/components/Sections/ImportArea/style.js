import styled from "styled-components";
import { colors, mixins } from "theme";

export const ImportAreaContainer = styled.div`
    position: relative;
    flex: 1;
    margin: 25px 50px;
    padding: 5px;
    border-radius: 4px;
    background-color: ${colors.greenLight2};
    .sub-import-area{
        border-radius: 4px;
        border: 1px dashed ${colors.blueDark};
        padding: 25px;
    }
    @media (max-width: ${mixins.md}px) {
        .sub-import-area{
            padding: 10px;
        }
    }
`;