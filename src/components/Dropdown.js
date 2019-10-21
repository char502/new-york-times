import React from "react";
import Select from "react-select";
import styled from "styled-components";
import newsSources from "../newsSources";

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  }),
  menu: base => ({
    ...base,
    fontFamily: "Roboto Condensed",
    backgroundColor: "white",
    fontSize: "12px",
    color: "black"
  })
};

const Dropdown = styled(Select)``;

export default ({ handleChange, filter }) => (
  <Dropdown
    options={newsSources}
    /* isClearable */
    getOptionLabel={option => `${option.name}`}
    getOptionValue={option => `${option.path}`}
    onChange={handleChange}
    placeholder={"Select by filter source"}
    styles={styles}
    clearValue={() => true}
    value={newsSources.filter(({ path }) => path === filter)}
  />
);
