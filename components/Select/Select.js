import React, { useState } from "react";
import Select from "react-select";

const dot = () => ({
  cursor: "pointer",
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#faca05" : "white",
    color: state.isSelected ? "#fff" : "rgb(134, 134, 134)",
    cursor: "pointer",
    fontWeight: 500,
    paddingLeft: 15,
    ":hover": {
      backgroundColor: state.isSelected ? "#e9cd2f" : "#ECE7E7",
    },
  }),

  input: (styles) => ({ ...styles, ...dot() }),
};

const options = [
  { value: "", label: "None" },
  { value: "28", label: "Action" },
  { value: "12", label: "Adventure" },
  { value: "16", label: "Animation" },
  { value: "35", label: "Comedy" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentary" },
  { value: "18", label: "Drama" },
  { value: "10751", label: "Family" },
  { value: "14", label: "Fantasy" },
  { value: "36", label: "History" },
  { value: "27", label: "Horror" },
  { value: "10402", label: "Music" },
  { value: "9648", label: "Mystery" },
  { value: "10749", label: "Romance" },
  { value: "878", label: "Science Fiction" },
  { value: "10770", label: "TV Movie" },
  { value: "53", label: "Thriller" },
  { value: "10752", label: "War" },
  { value: "37", label: "Western" },
];

const Options = (props) => {
  return (
    <div>
      <Select
        defaultValue={props.value}
        onChange={(item) => props.onChange(item.value)}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};

export default Options;
