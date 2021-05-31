import React from "react";
import Button from "@material-ui/core/Button";

function RegularButton({ ...props }) {
  return (
    <Button className={props.styleOfBtn} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
export default RegularButton;
