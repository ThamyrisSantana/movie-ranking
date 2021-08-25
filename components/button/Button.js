import React from "react";
import styles from "./button.module.scss";

export const Button = (props) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
