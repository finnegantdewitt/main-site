import "./index.scss";
import { init, animate } from "../../boids/index.js";
import crosshairImg from "../../assets/images/crosshair.svg";
import { useEffect, useRef } from "react";

const Boids = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let removeRenderer = init(mountRef);
    animate();
    return removeRenderer;
  }, []);

  return (
    <>
      <div className="top-bar"></div>
      <div id="blocker">
        <div id="instructions">
          <p style={{ fontSize: "36px" }}>Click to play</p>
          <p>
            Move: WASD
            <br />
            Up/Down: E/Q
            <br />
            Increase/Decrease avoidFactor: U/J
            <br />
            Increase/Decrease alignFactor: I/K
            <br />
            Increase/Decrease centeringFactor: O/L
            <br />
            Pause the Boids: T<br />
            Look: MOUSE
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
