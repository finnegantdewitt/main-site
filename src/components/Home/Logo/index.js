import { useEffect, useRef } from "react";
// import gsap from "gsap-trial";
// import DrawSVGPlugin from "gsap-trial/DrawSVGPlugin";
import LogoS from "../../../assets/images/logo-f1.png";
import LogoF1SVG from "../../../assets/images/logo-f1.svg";
import "./index.scss";

const Logo = () => {
  const bgRef = useRef();

  return (
    <div className="logo-container" ref={bgRef}>
      <img src={LogoF1SVG} style={{ "--1": "1" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "2" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "3" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "4" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "5" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "6" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "7" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "8" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "9" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "10" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "11" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "12" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "13" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "14" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "15" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "16" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "17" }} className="shape"></img>
      <img src={LogoF1SVG} style={{ "--1": "18" }} className="shape"></img>
    </div>
  );
};

export default Logo;
