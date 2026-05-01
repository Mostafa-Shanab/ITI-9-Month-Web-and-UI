import { Component } from "react";
// import { useState } from "react";
import "./Slider.css";

import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

// function Slider() {
//   const [current, setCurrent] = useState(0);

//   const prev = () => setCurrent((current - 1 + images.length) % images.length);
//   const next = () => setCurrent((current + 1) % images.length);

//   return (
//     <div className="carousel-wrapper">
//       <div className="carousel-track">
//         <img
//           src={images[current]}
//           alt={`Slide ${current + 1}`}
//           className="carousel-image"
//         />
//         <button onClick={prev} className="carousel-btn carousel-btn-left">
//           &#8592;
//         </button>
//         <button onClick={next} className="carousel-btn carousel-btn-right">
//           &#8594;
//         </button>
//       </div>

//       <div className="carousel-dots">
//         {images.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`carousel-dot ${i === current ? "active" : ""}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

class Slider extends Component {
  state = { current: 0 };

  prev = () => {
    this.setState({
      current: (this.state.current - 1 + images.length) % images.length,
    });
  };

  next = () => {
    this.setState({ current: (this.state.current + 1) % images.length });
  };

  render() {
    const { current } = this.state;

    return (
      <div className="carousel-wrapper">
        <div className="carousel-track">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="carousel-image"
          />
          <button
            onClick={this.prev}
            className="carousel-btn carousel-btn-left"
          >
            &#8592;
          </button>
          <button
            onClick={this.next}
            className="carousel-btn carousel-btn-right"
          >
            &#8594;
          </button>
        </div>

        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => this.setState({ current: i })}
              className={`carousel-dot ${i === current ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Slider;
