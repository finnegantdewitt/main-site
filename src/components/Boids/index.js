import "./index.scss";
import { init, animate } from "../../boids/index.js";
import crosshairImg from "../../assets/images/crosshair.svg";
import { useEffect, useRef, useState } from "react";

const Boids = () => {
  const [boidsCount, setBoidsCount] = useState(200);
  const [shootBoidsMode, setShootBoidsMode] = useState(true);
  const [boxBoundsWidth, setBoxBoundsWidth] = useState(150);
  const [boxBoundsDepth, setBoxBoundsDepth] = useState(150);
  const [boxBoundsHeight, setBoxBoundsHeight] = useState(100);
  const [avoidFactor, setAvoidFactor] = useState(150);
  const [alignFactor, setAlignFactor] = useState(150);
  const [centeringFactor, setCenteringFactor] = useState(100);

  useEffect(() => {
    let removeRenderer = init(boidsCount, {
      width: boxBoundsWidth,
      depth: boxBoundsDepth,
      height: boxBoundsHeight,
    });
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
            Controls: <br /> T : freeze boids <br /> F :{" "}
            {shootBoidsMode ? "shoot" : "mark"} boid
          </li>
          <li style={{ minWidth: "88px" }}>
            <label className="switch">
              <input
                type="checkbox"
                id="shootBoidMode"
                checked={shootBoidsMode}
                onChange={() => setShootBoidsMode(!shootBoidsMode)}
              />
              <span className="toggle-slider"></span>
            </label>
            <div>
              {shootBoidsMode ? "Mode: Kill boids" : "Mode: Mark boids "}
            </div>
          </li>
          <li>
            <input
              type="range"
              min="1"
              max="500"
              id="boidsCountSlider"
              value={boidsCount}
              onChange={(e) => {
                setBoidsCount(e.target.value);
              }}
              className="slider"
            />
            <div>Number of Boids: {boidsCount}</div>
          </li>
          <li>
            <span>Box Dimensions</span>
          </li>
          <li>
            <input
              type="range"
              min="10"
              max="500"
              id="boxBoundsWidth"
              value={boxBoundsWidth}
              onChange={(e) => {
                setBoxBoundsWidth(e.target.value);
              }}
              className="slider"
            />
            <label className="slider-label"> Width: {boxBoundsWidth}</label>
            <div>
              <input
                type="range"
                min="10"
                max="500"
                id="boxBoundsDepth"
                value={boxBoundsDepth}
                onChange={(e) => {
                  setBoxBoundsDepth(e.target.value);
                }}
                className="slider"
              />
              <label className="slider-label"> Depth: {boxBoundsDepth}</label>
            </div>
            <div>
              <input
                type="range"
                min="10"
                max="500"
                id="boxBoundsHeight"
                value={boxBoundsHeight}
                onChange={(e) => {
                  setBoxBoundsHeight(e.target.value);
                }}
                className="slider"
              />
              <label className="slider-label"> Height: {boxBoundsHeight}</label>
            </div>
          </li>
        </ul>
      </div>
      <div id="blocker">
        <div id="instructions">
          <p style={{ fontSize: "36px", color: "white" }}>
            Click to Start <br /> ESC to Stop / Change settings
          </p>
        </div>
      </div>
      <div id="crosshair" style={{ display: "none" }}>
        <img id="crosshairImage" src={crosshairImg} />
      </div>
    </>
  );
};

export default Boids;
