import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { CommonArgs } from "./common";
import { genenrateCompressedData, TreeNode, Node } from "../classes/Huffman";
import { display_chars } from "../util/DisplayChars";
import "./StepsPanel.css";
import Simple from "../text/Simple_Test_Text";
import Never_Gonna_Lyrics from "../text/Never_Gonna";
import GetFile from "./showFile";
import * as d3 from "d3";
import GithubLogo from "../assets/github-icon.svg";
interface Char {
  char: string;
  count: number;
}
interface BinaryRepresentation {
  char: string;
  bits: string | undefined;
}

const StepsPanel: React.FC<CommonArgs> = ({
  displayText,
  setTree,
  setCompressed,
  setDisplayText,
  setPreviousTransform,
}) => {
  // should always be sorted in ascending order
  const [nodeArray, setNodeArray] = useState<Array<TreeNode>>([]);
  const [CompBinValues, setCompBinValues] = useState<
    Array<BinaryRepresentation>
  >([]);

  const countFrequency = () => {
    setTree([]);
    setNodeArray([]);
    setCompBinValues([]);
    setCompressed(undefined);
    //get the char frequencies
    const charFreqs = new Map<string, number>();
    for (let i = 0; i < displayText.length; i++) {
      let letter = displayText[i];
      let letterFreq = charFreqs.get(letter);
      if (letterFreq === undefined) {
        letterFreq = 0;
      }
      letterFreq += 1;
      charFreqs.set(letter, letterFreq);
    }

    // sort them in an array (need to do this cause
    // can't sort right after setState cause it's
    // not set yet :|)
    const charArray = new Array<Char>();
    charFreqs.forEach((value, key) => {
      let ch: Char = {
        char: key,
        count: value,
      };
      charArray.push(ch);
    });
    charArray.sort((a, b) => {
      return a.count - b.count; // ascending order
    });

    charArray.forEach((ch) => {
      let tempNode: Node = { char: ch.char, bits: "" };
      let node = new TreeNode(tempNode, false, ch.count);
      setNodeArray((prevNodes) => [...prevNodes, node]);
    });
  };

  const build = () => {
    const branchNode: Node = { char: null, bits: null };
    if (nodeArray.length > 1) {
      let tempCount = nodeArray[0].count + nodeArray[1].count;
      let temp = new TreeNode(branchNode, false, tempCount);
      temp.left = nodeArray[0];
      temp.right = nodeArray[1];
      let insertAt = nodeArray.findIndex((element) => {
        return element.count > tempCount;
      });
      // I have to do all this messy setArray stuff in
      // a single statement because otherwise it won't
      // update before calling the next setArray.
      // Everything done in here is assuming that the
      // first two element we will remove are still in
      // the array.
      if (insertAt !== -1) {
        // inserts temp at the insertAt
        // then removes the first two elements
        setNodeArray((prevNodes) => {
          let inserted = [
            ...prevNodes.slice(0, insertAt),
            temp,
            ...prevNodes.slice(insertAt),
          ];
          let firstTwoRemoved = inserted.slice(2);
          return firstTwoRemoved;
        });
      } else {
        // inserts temp at the end
        // then removes the first two elements
        setNodeArray((prevNodes) => {
          let pushed = [...prevNodes, temp];
          let firstTwoRemoved = pushed.slice(2);
          return firstTwoRemoved;
        });
      }
      setTree((prev) => {
        let treeNodes = [];
        let isTempPushed = false;
        prev.forEach((tNode) => {
          if (tNode?.parent === undefined) {
            treeNodes.push(tNode);
          } else if (
            // preserves the order of the tree nodes when combining
            // an inter node and a letter
            tNode.parent?.count === temp.count &&
            tNode.parent?.value === temp.value &&
            !isTempPushed // covers when combining 2 inter nodes
          ) {
            isTempPushed = true;
            treeNodes.push(temp);
          }
        });
        if (!isTempPushed) treeNodes.push(temp);
        return treeNodes;
      });
    }
  };

  const buildAll = () => {
    const branchNode: Node = { char: null, bits: null };
    let tmpNodeArray = nodeArray;
    while (tmpNodeArray.length > 1) {
      let tempCount = tmpNodeArray[0].count + tmpNodeArray[1].count;
      let temp = new TreeNode(branchNode, false, tempCount);
      temp.left = tmpNodeArray[0];
      temp.right = tmpNodeArray[1];
      let insertAt = tmpNodeArray.findIndex((element) => {
        return element.count > tempCount;
      });
      if (insertAt !== -1) {
        tmpNodeArray = [
          ...tmpNodeArray.slice(0, insertAt),
          temp,
          ...tmpNodeArray.slice(insertAt),
        ];
        tmpNodeArray = tmpNodeArray.slice(2);
      } else {
        tmpNodeArray.push(temp);
        tmpNodeArray = tmpNodeArray.slice(2);
      }
    }
    setNodeArray(tmpNodeArray);
    setTree(tmpNodeArray);
  };

  type BitString = Readonly<(0 | 1)[]>;
  const buildBinTable = () => {
    if (nodeArray.length === 1) {
      const lookupTable: Partial<Record<string, BitString>> = {};

      // build the lookup table
      (function r(node: TreeNode | undefined, bits: BitString) {
        if (node === undefined) return;
        if (node.value.char !== null) {
          lookupTable[node.value.char] = bits;
        }
        r(node.left, [...bits, 0]);
        r(node.right, [...bits, 1]);
      })(nodeArray[0], []);

      const binTableArray = [];
      for (const char in lookupTable) {
        // console.log(`${char}: ${lookupTable[char]}`);
        let b: BinaryRepresentation = {
          char: char,
          bits: lookupTable[char]?.join(""), // prob won't ever be undef
        };
        binTableArray.push(b);
      }
      // console.log(binTableArray);
      setCompBinValues(binTableArray);
    }
  };

  const viewCompressed = () => {
    if (nodeArray.length === 1) {
      setCompressed(genenrateCompressedData(displayText, nodeArray[0]));
    }
  };

  function reset() {
    setDisplayText("");
    setTree([]);
    setNodeArray([]);
    setCompBinValues([]);
    setPreviousTransform(undefined);
    setCompressed(undefined);
  }
  const loadSimple = () => {
    reset();
    setDisplayText(Simple);
  };
  const loadComplex = () => {
    reset();
    setDisplayText(Never_Gonna_Lyrics);
  };

  return (
    <div className="StepsPanel">
      <div
        style={{
          marginLeft: "1em",
          marginTop: "1em",
          marginRight: "1em",
          width: "100%",
        }}
      >
        <button
          className={"huff-button"}
          style={{ marginRight: "1em" }}
          onClick={() => reset()}
        >
          Reset
        </button>
        <GetFile setDisplayText={setDisplayText} resetPage={reset} />
        <a
          href="https://github.com/finnegantdewitt/compression-visualizer"
          target="_blank"
        >
          <img
            style={{ float: "right" }}
            className="github-icon"
            src={GithubLogo}
          />
        </a>
      </div>
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginLeft: "15px",
          }}
        >
          Visualization of the Huffman compression algorithm.
        </p>
        <ol>
          <li>
            Read the text
            <button className={"huff-button"} onClick={() => loadSimple()}>
              Simple Text
            </button>
            <button className={"huff-button"} onClick={() => loadComplex()}>
              More Complex Text
            </button>
          </li>
          <li>
            Count the frequency of each letter{" "}
            <button className={"huff-button"} onClick={() => countFrequency()}>
              Count Frequency
            </button>
          </li>
          <li>
            Build the tree until one node remains
            <button className={"huff-button"} onClick={() => build()}>
              Build
            </button>
            <button className={"huff-button"} onClick={() => buildAll()}>
              Build All
            </button>
          </li>
          <ol>
            <li>Take the two lowest frequency nodes</li>
            <li>
              Connect them to a new intermediate node (inter) with the sum of
              their frequencies
            </li>
          </ol>
          <li>
            Traverse the tree to get the new binary representation of the chars
            <button className={"huff-button"} onClick={() => buildBinTable()}>
              Binary Table
            </button>
          </li>
          <ul>
            <li>If left: append 0, if right: append 1</li>
          </ul>
          <li>
            View Compressed file
            <button className={"huff-button"} onClick={() => viewCompressed()}>
              View Compressed
            </button>
          </li>
        </ol>
      </div>
      <div className="row">
        {nodeArray.length > 0 ? (
          <div className="column">
            <table>
              <thead>
                <tr>
                  <th>Node</th>
                  <th>freq</th>
                </tr>
              </thead>
              <tbody>
                {nodeArray.map((treeNode, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        {treeNode.value.char !== null
                          ? display_chars[treeNode.value.char] ??
                            treeNode.value.char
                          : "inter"}
                      </td>
                      <td>{treeNode.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
        {CompBinValues && CompBinValues.length > 0 ? (
          <div className="column">
            <table>
              <thead>
                <tr>
                  <th>Char</th>
                  <th>BinValue</th>
                </tr>
              </thead>
              <tbody>
                {CompBinValues.map(({ char, bits }, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{display_chars[char] ?? char}</td>
                      <td>{bits}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StepsPanel;
