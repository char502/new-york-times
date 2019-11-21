import React from "react";
import { CarouselButton } from "../Button";

// export const CustomArrow = (props) => (
//   <CarouselButton small type="button" {...props}>
//     {props.next ? ">" : "<"}
//   </CarouselButton>
// );

export const CustomArrow = (props) => {
  console.log(props);
  return (
    <CarouselButton small type="button" {...props}>
      {props.next ? ">" : "<"}
    </CarouselButton>
  );
};
