import React from "react";
import { CarouselButton } from "../Button";
// import styled from "styled-components/macro";

// const ArrowContainer = styled.div`
//   display: block;
// `;

// import Icon from './Icon'

// export default (props) => {
//   console.log(props);
//   return (
//     <Button
//       type="button"
//       onClick={props.onClick}
//       className={`button button--text button--icon ${props.className}`}
//       aria-label={props.to}
//       style={}
//       /* className="carouselButton" */
//       /* carouselButton={to} */
//     ></Button>
//   );
// };

export const CustomPrevArrow = (props) => {
  console.log(props);
  return (
    <CarouselButton
      small
      type="button"
      onClick={props.onClick}
      /* {...props} */
      /* style={props.style} */
    >
      next
    </CarouselButton>
  );
};

export const CustomNextArrow = (props) => (
  <CarouselButton
    small
    type="button"
    onClick={props.onClick}
    /* {...props} */
    /* style={props.style} */
  >
    prev
  </CarouselButton>
);

// class LeftNavButton extends React.Component {
//   render() {
//     return <button {...this.props}>Next</button>
//   }
// }

// var CustomNextArrow = () => (
//   <button type="button" className="slick-prev" onClick={props.onClick}>
//     prev
//       </button>

// )

// export { CustomPrevArrow, CustomNextArrow };

// React.createClass({
//   render() {
//     return (
//       <button type="button" className="slick-prev" onClick={this.props.onClick}>
//         What
//       </button>
//     );
//   }
// });

// export { CustomPrevArrow, CustomNextArrow }

// ============================================================

// var CustomNextArrow = React.createClass({
//   render() {
//     return (
//       <button type="button" className="slick-prev" onClick={this.props.onClick}>
//         What
//       </button>
//     );
//   }
// });

// import React from "react";
// import { Button } from "../Button";

// // import Icon from './Icon'

// export default ({ className, to, onClick }) => (
//     <button
//         type="button"
//         onClick={onClick}
//         className={`button button--text button--icon ${className}`}
//         aria-label={to}
//     >
//         <Button className="carouselButton" carouselButton={to} />
//     </button>
// );

// ============================================================

// import React from "react";

// import Icon from "../../Images/Icon.jpg";

// export default ({ className, to, onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`button button--text button--icon ${className}`}
//     aria-label={to}
//   >
//     <Icon className="icon" icon={to} />
//   </button>
// );
