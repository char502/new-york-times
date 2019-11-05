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
    background: "grey",
    position: "absolute",
    right: "35px",
    bottom: "3px",
    width: "35px",
    height: "30px",
    backgroundColor: "transparent"
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
    backgroundColor: "lightGrey",
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    position: "relative"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    textAlign: "center",
    // backgroundColor: "darkGrey",
    color: "darkGrey",
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
    backgroundColor: "darkGrey",
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
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    top: "15px"
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "12px",
    fontWeight: "bold",
    position: "absolute",
    top: "15px",
    color: "black"
  })
};

const Dropdown = styled(Select)``;

export default ({ handleClear, handleChange, filter }) => (
  <Dropdown
    options={newsSources}
    isSearchable
    isClearable
    clearValue
    getOptionLabel={(option) => `${option.name}`}
    getOptionValue={(option) => `${option.path}`}
    onChange={handleChange}
    placeholder={"Filter By Source (Optional)"}
    styles={styles}
    value={newsSources.filter(({ path }) => path === filter)}
  />
);
