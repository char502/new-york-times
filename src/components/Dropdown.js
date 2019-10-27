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
    // backgroundColor: "orange",
    // backgroundColor: "white",
    fontSize: "12px",
    color: "black",
    // background: "blue",
    height: "30px",
    width: "180px",
    padding: "0 16px",
    borderRadius: "4px",
    outline: "none",
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    margin: "0 5px",
    bordeRadius: "4px",
    position: "relative"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    // borderLeft: 0.5px solid rgba(0, 0, 0, 0.2),
    // borderLeft: "grey",
    // background: "green",
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
    // borderLeft: 0.5px solid rgba(0, 0, 0, 0.2),
    // borderLeft: "grey",
    // background: "green",
    backgroundColor: "lightgrey",
    // width: "25px",
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
  // input: (base) => ({
  //   ...base,
  //   background: "orange"
  // }),
  placeholder: (base) => ({
    ...base,
    fontSize: "12px",
    // alignItems: "center"
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
