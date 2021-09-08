import React, { useState } from "react";
import styles from "./styles.module.scss";
import toast, { Toaster } from "react-hot-toast";

const FilterButton = (props) => {
  function setInfos(e) {
    props.setButtonFilter(e.target.value);

    toast.success("Filter added");
  }
  return (
    <div>
      <button
        className={styles.btn}
        type="button"
        value={props.buttonValue}
        onClick={setInfos}
      >
        {props.filterName}
        <Toaster />
      </button>
    </div>
  );
};

export default FilterButton;
