import React from "react";
import { CarouselButton } from "../Button";

export const CustomArrow = (props) => {
  // console.log(props);
  return (
    <CarouselButton small type="button" onClick={props.onClick} {...props}>
      {props.next ? "Next" : "Prev"}
    </CarouselButton>
  );
};

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
