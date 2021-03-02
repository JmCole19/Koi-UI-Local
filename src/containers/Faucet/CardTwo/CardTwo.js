import { Button, Input } from "antd";
import React from "react";

export default function CardTwo(props) {

  return (
    <div>
      <Input
          type="text"
          onChange={props.change}
          placeholder="input your adress"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={props.clickedEnter}
        >
          Get Koi
        </Button>
    </div>
  );
}
