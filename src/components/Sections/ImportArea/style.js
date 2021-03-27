import styled from "styled-components";
import { colors, mixins } from "theme";

export const ImportAreaContainer = styled.div`
    // position: relative;
    position: sticky;
    top: 141px;
    width: 100%;
    padding: 25px 50px;
    background-color: white;
    .import-area{
        flex: 1;
        padding: 5px;
        border-radius: 4px;
        background-color: ${colors.greenLight2};
    }
    .sub-import-area{
        border-radius: 4px;
        border: 1px dashed ${colors.blueDark};
        // padding: 10px;
    }
    @media (max-width: ${mixins.md}px) {
     
    }
`;