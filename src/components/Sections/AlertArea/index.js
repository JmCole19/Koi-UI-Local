/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { colors } from "theme";

function AlertArea({
  value = 1,
}) {
  return (
    <CircularProgressbar
      value={value}
      text={`${value}`}
      maxValue={3}
      strokeWidth={15}
      styles={buildStyles({
        strokeLinecap: "butt",
        textSize: "44px",
        pathTransitionDuration: 0.5,
        pathColor: colors.blueDark,
        textColor: colors.blueDark,
        trailColor: colors.white,
        backgroundColor: "#3e98c7",
      })}
    />
  );
}

export default AlertArea;
