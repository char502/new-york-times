import React from "react";
import { CarouselButton } from "../Button";

export const CustomArrow = (props) => (
  <CarouselButton small type="button" {...props}>
    {props.next ? ">" : "<"}
  </CarouselButton>
);
