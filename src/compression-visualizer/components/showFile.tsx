import React, { useState } from "react";
import { assert } from "../util";

const hasNonAsciiCharacters = (str: string) => /[^\u0000-\u007f]/.test(str);

// testing file input
function GetFile({
  setDisplayText,
  resetPage,
}: {
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  resetPage: Function;
}) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetPage();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target!.result;
      if (text === null) {
        alert("Please select a file with text");
      } else {
        // should be unreachable since we would only get an arraybuffer if that
        // was what we asked the browser for, which we don't, but typescript
        // doesn't know that in this situation so we still need either a cast or
        // a condition to narrow the type
        assert(
          !(text instanceof ArrayBuffer),
          "unreachable case - file input gave us an arraybuffer unexpectedly"
        );
        if (text !== null && hasNonAsciiCharacters(text)) {
          alert("please select a file with only ascii characters (nice try)");
        } else if (text !== null) {
          setDisplayText(text);
        }
      }
    };
    reader.readAsText(e.target.files![0]);
    e.target.value = "";
  };

  return (
    <input
      className="huff-button"
      type="file"
      accept=".txt"
      style={{ color: "transparent" }} // removes the "no file chosen" text
      onChange={(e) => changeHandler(e)}
    />
  );
}

export default GetFile;
