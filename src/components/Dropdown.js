import React from "react";
import Select from "react-select";
import styled from "styled-components";
import newsSources from "../newsSources";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  })
};

// const styles = {
//   clearIndicator: (base) => ({
//     ...base,
//     background: "red"
//   }),
//   control: (base) => ({
//     // ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "8px",
//     color: "black",
//     // background: "blue",
//     height: "24px",
//     width: "150px",
//     padding: "0 16px",
//     borderRadius: "4px",
//     outline: "none",
//     border: "0.5px solid rgba(0, 0, 0, 0.2)",
//     margin: "0 5px",
//     bordeRadius: "4px",
//     position: "relative"
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     // background: "green",
//     width: "20px",
//     height: "24px",
//     padding: 0,
//     position: "absolute",
//     borderRadius: "4px",
//     right: 0,
//     top: 0
//   }),
//   menu: (base) => ({
//     ...base,
//     fontFamily: "Roboto Condensed",
//     backgroundColor: "white",
//     fontSize: "12px",
//     color: "black"
//   })
// };

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
