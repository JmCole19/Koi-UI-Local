/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { colors } from "theme";

function MyProgress({
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

export default MyProgress;
