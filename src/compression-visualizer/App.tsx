import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import LyricSplit from "./components/LyricSplit";
import Never_Gonna_Lyrics from "./text/Never_Gonna";
import Simple from "./text/Simple_Test_Text";
import * as d3 from "d3";
import { CommonArgs } from "./components/common";
import { useHsbData } from "./components/HoverStyleBodge";
import { CompressedHuffmanData, TreeNode } from "./classes/Huffman";

// a little janky to import it from there, but I just
// want one MobileWarning file
import MobileWarning from "../components/MobileWarning";

function App() {
  const hsbData = useHsbData();
  const [displayText, setDisplayText] = useState<string>("");
  const [tree, setTree] = useState<Array<TreeNode | undefined>>([]);
  const [compressed, setCompressed] = useState<
    CompressedHuffmanData | undefined
  >(undefined);
  const [previousTransform, setPreviousTransform] = useState<
    d3.ZoomTransform | undefined
  >(undefined);

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [userHasBeenWarned, setUserHasBeenWarned] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 500;

  const commonArgs: CommonArgs = {
    displayText,
    setDisplayText,
    tree,
    setTree,
    hsbData,
    compressed,
    setCompressed,
    previousTransform,
    setPreviousTransform,
  };

  return (
    <div className="AppC">
      {isMobile && !userHasBeenWarned ? (
        <MobileWarning setUserHasBeenWarned={setUserHasBeenWarned} />
      ) : (
        <LyricSplit {...commonArgs} />
      )}
    </div>
  );
}

export default App;
