import {
  faCss3,
  faHtml5,
  faJsSquare,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

const About = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"About me".split("")}
              idx={15}
            />
          </h1>
          <p>
            I'm a college student attending the University of California, Santa
            Cruz planning to graduate in December of 2022, majoring in Computer
            Science. My experience with programming started in high school when
            I learned C++. I then branched out into playing with many different
            languages and web technologies, including projects like building an
            email server on an AWS free-tier instance, which honed my bash
            skills, and making a maze solver in C#
          </p>
          <p>
            My professional experience comes from one year at a startup called
            Foodhaven. The goal of this company is to serve leftover food at
            discounted prices when a restaurant is closing. For this job, I
            programmed the business dashboard using React JS, along with helping
            with the mobile app (react-native).
          </p>
          <p>
            Now, I feel confident programming in many languages with my biggest
            strengths being javascript and python. You can check out 2 of my
            favorite (and actually finished) javascript/typescript projects on
            this site. The first is{" "}
            <NavLink
              exact="true"
              activeclassname="active"
              className="boids-text-link"
              to="/boids"
            >
              boids simulation project
            </NavLink>
            , and the second is a{" "}
            <NavLink
              exact="true"
              activeclassname="active"
              className="huffman-text-link"
              to="/huffman"
            >
              visualization of the Huffman coding compression algorithm.
            </NavLink>
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubeSpinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPython} color="#3470A2" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faReact} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default About;
