import React from "react";
import styles from "./styles.module.scss";

export default function ChangePageBtn(props) {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
