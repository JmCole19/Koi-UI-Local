import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { colors } from "theme";

export const TopbarContainer = styled(Navbar)`
  width: 100%;
  background: ${colors.blueDark};
  padding: 0rem 40px;
  min-height: 80px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
  box-shadow: 0px 3px 6px #00000029;
  .navbar-brand {
    color: ${colors.white};
  }
  .navbar-toggler {
    border-color: transparent;
    color: ${colors.white} !important;
  }
  .navbar-collapse {
    .navbar-nav {
      a {
        color: ${colors.white};
        font-weight: 700;
        font-size: 16px;
        align-self: center;
        margin-right: 48px;
        &.btn-nav {
          background: transparent;
          border-radius: 4px;
          padding: 2px 25px;
          color: ${colors.white};
          border: 1.5px solid ${colors.white};
        }
      }
    }
  }
  @media (max-width: 767px) {
    .navbar-collapse {
      .navbar-nav {
        a {
          margin-left: 0px;
          align-self: flex-start;
          margin-bottom: 5px;
        }
      }
    }
  }
`;