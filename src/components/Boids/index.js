import "./index.scss";
import { init, animate } from "../../boids/index.js";
import crosshairImg from "../../assets/images/crosshair.svg";
import { useEffect, useRef, useState } from "react";

const Boids = () => {
  const [boidsCount, setBoidsCount] = useState(100);
  const mountRef = useRef(null);

  useEffect(() => {
    let removeRenderer = init(boidsCount);
    return removeRenderer;
  }, []);

  return (
    <>
      <div className="top-bar">
        <ul className="elements">
          <li>
            BOIDS: <br /> Click screen to play <br /> ESC to pause
          </li>
          <li>
            Movement: <br /> WASD to move <br /> E Q : UP DOWN
          </li>
          <li>
            Controls: <br /> T : freeze boids <br /> F : mark boid
          </li>
          <li>
            <input
              type="range"
              min="1"
              max="500"
              id="boidsCountSlider"
              onChange={(e) => {
                setBoidsCount(e.target.value);
              }}
              className="slider"
            />
            <div>Number of Boids: {boidsCount}</div>
          </li>
        </ul>
      </div>
      <div id="blocker">
        <div id="instructions">
          <p style={{ fontSize: "36px" }}>Click to play</p>
          <p>
            Increase/Decrease avoidFactor: U/J
            <br />
            Increase/Decrease alignFactor: I/K
            <br />
            Increase/Decrease centeringFactor: O/L
          </p>
        </div>
      </div>
      <div id="crosshair" style={{ display: "none" }}>
        <img id="crosshairImage" src={crosshairImg} />
      </div>
      <div ref={mountRef}></div>
    </>
  );
};

export default Boids;
