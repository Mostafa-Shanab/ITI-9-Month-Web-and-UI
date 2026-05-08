import { useState, useCallback, useMemo } from "react";
import "./Slider.css";

import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function Slider() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((current - 1 + images.length) % images.length),
    [current],
  );

  const next = useCallback(
    () => setCurrent((current + 1) % images.length),
    [current],
  );

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  const currentImage = useMemo(() => images[current], [current]);
  const currentAlt = useMemo(() => `Slide ${current + 1}`, [current]);

  const dotButtons = useMemo(
    () =>
      images.map((_, i) => (
        <button
          key={i}
          onClick={() => goToSlide(i)}
          className={`carousel-dot ${i === current ? "active" : ""}`}
          aria-label={`Go to slide ${i + 1}`}
          title={`Slide ${i + 1} of ${images.length}`}
        />
      )),
    [current, goToSlide],
  );

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        <img src={currentImage} alt={currentAlt} className="carousel-image" />
        <button onClick={prev} className="carousel-btn carousel-btn-left">
          &#8592;
        </button>
        <button onClick={next} className="carousel-btn carousel-btn-right">
          &#8594;
        </button>
        <div className="carousel-counter">
          {current + 1} / {images.length}
        </div>
      </div>

      <div className="carousel-dots">{dotButtons}</div>
    </div>
  );
}

export default Slider;
