import styled from "styled-components";
// import { colors } from "theme";

export const CustomAlertContainer = styled.div`
  width: 100%;
  -webkit-transition: opacity 3s ease-in-out;
  -moz-transition: opacity 3s ease-in-out;
  -ms-transition: opacity 3s ease-in-out;
  -o-transition: opacity 3s ease-in-out;
  opacity: 1;
  transition: opacity 2s linear;
  .custom-alert{ margin-bottom: 0px; }  
  p {
    margin-top: 0px;
  }
  .icon-close{
    position: absolute;
    right: 20px;
    top: 10px;
  }
`;
