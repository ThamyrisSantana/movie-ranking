import React, { useState } from "react";

import styles from "./styles.module.scss";

export default function InputFilter(props) {
  return (
    <div>
      <input
        className={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type="number"
      />
    </div>
  );
}
