import React from "react";
import Select from "react-select";
import styled from "styled-components";
import newsSources from "../newsSources";

// const styles = {
//   control: (base) => ({
//     ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "12px",
//     color: "black"
//   }),
//   menu: (base) => ({
//     ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "12px",
//     color: "black"
//   })
// };

const styles = {
  clearIndicator: (base) => ({
    ...base,
    background: "red"
  }),
  control: (base) => ({
    // ...base,
    fontFamily: "Roboto Condensed",
    fontSize: "12px",
    color: "black",
    height: "30px",
    width: "180px",
    padding: "0 16px",
    borderRadius: "4px",
    outline: "none",
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    position: "relative"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    textAlign: "center",
    width: "30px",
    height: "30px",
    padding: 0,
    position: "absolute",
    borderRadius: "4px",
    right: 0,
    top: "5px"
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "lightgrey",
    height: "20px",
    padding: 0,
    margin: 0,
    textAlign: "center",
    position: "absolute",
    borderRadius: "4px",
    right: "35px",
    top: "5px",
    color: "black"
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "12px",
    position: "absolute",
    top: "15px",
    color: "black"
  })
};

const Dropdown = styled(Select)``;

export default ({ handleChange, filter }) => (
  <Dropdown
    options={newsSources}
    /* isClearable */
    getOptionLabel={(option) => `${option.name}`}
    getOptionValue={(option) => `${option.path}`}
    onChange={handleChange}
    placeholder={"Select by filter source"}
    styles={styles}
    clearValue={() => true}
    value={newsSources.filter(({ path }) => path === filter)}
  />
);
